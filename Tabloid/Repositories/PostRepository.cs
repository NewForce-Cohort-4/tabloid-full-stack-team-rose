using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Tabloid.Controllers;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
       
                    SELECT p.id AS Id, p.Title, p.CategoryId AS PostCategoryId,
                    p.PublishDateTime, p.UserProfileId AS PostUserProfileId,
                    
                    up.FirstName,

                    c.Name
                    FROM Post p
                    LEFT JOIN Category c on p.CategoryId = c.Id
                    LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                    ORDER BY PublishDateTime";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "PostUserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "PostCategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        }); ;
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsByUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE p.UserProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        // private Post NewPostFromReader(SqlDataReader reader)
        // {
        //     // there is a DbUtils.GetNullableDateTime available for PublishDateTime that errored
        //     return new Post()
        //     {
        //         Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //         Title = reader.GetString(reader.GetOrdinal("Title")),
        //         Content = reader.GetString(reader.GetOrdinal("Content")),
        //         ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
        //         CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //         PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
        //         CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
        //         Category = new Category()
        //         {
        //             Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
        //             Name = reader.GetString(reader.GetOrdinal("CategoryName"))
        //         },
        //         UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //         UserProfile = new UserProfile()
        //         {
        //             Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //             FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
        //             LastName = reader.GetString(reader.GetOrdinal("LastName")),
        //             DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
        //             Email = reader.GetString(reader.GetOrdinal("Email")),
        //             CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //             ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
        //             UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //             UserType = new UserType()
        //             {
        //                 Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //                 Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
        //             }
        //         }
        //     };
        // }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id AS PostId, p.Title, p.ImageLocation, p.Content, p.CreateDateTime, 
                        p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                        up.Id AS UserProfileId, up.FirebaseUserId, up.DisplayName, up.FirstName, 
                        up.LastName, up.Email,
                        up.CreateDateTime, up.ImageLocation, up.UserTypeId
                    FROM Post p
                    LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                    WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = id,
                            Title = DbUtils.GetString(reader, "Title"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId")
                            },
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }
    }
}
