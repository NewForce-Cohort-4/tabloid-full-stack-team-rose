using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using Tabloid.Models;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        //public List<Post> GetAll()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = PostQuery;

        //            var posts = new List<Post>();

        //            var reader = cmd.ExecuteReader();
        //            while (reader.Read())
        //            {
        //                posts.Add(NewPost(reader));
        //            }
        //            reader.Close();

        //            return posts;
        //        }
        //    }
        //}

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

        //public object GetbyId(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = PostQuery + " WHERE p.id = @Id";
        //            DbUtils.AddParameter(cmd, "@Id", id);

        //            Post post = null;

        //            var reader = cmd.ExecuteReader();
        //            if (reader.Read())
        //            {
        //                post = NewPost(reader);
        //            }
        //            reader.Close();

        //            return post;
        //        }
        //    }
        //}

        //public void Add(Post post)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"INSERT INTO Post (Text, UserProfileId)
        //                                OUTPUT INSERTED.ID
        //                                VALUES (@Text, @UserProfileId)";
        //            DbUtils.AddParameter(cmd, "@Text", post.Text);
        //            DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

        //            post.Id = (int)cmd.ExecuteScalar();
        //        }
        //    }
        //}

        private string PostQuery
        {
            get
            {
                return @"SELECT p.Id, p.Text, p.UserProfileId,
                                up.FirebaseUserId, up.Name AS UserProfileName, up.Email, up.UserTypeId,
                                ut.Name AS UserTypeName
                           FROM Post p
                                LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                LEFT JOIN UserType ut on up.UserTypeId = ut.Id";
            }
        }

        //private Post NewPost(SqlDataReader reader)
        //{
        //    return new Post()
        //    {
        //        Id = DbUtils.GetInt(reader, "Id"),
        //        Text = DbUtils.GetString(reader, "Text"),
        //        UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
        //        UserProfile = new UserProfile()
        //        {
        //            Id = DbUtils.GetInt(reader, "UserProfileId"),
        //            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //            FirstName = DbUtils.GetString(reader, "UserProfileName"),
        //            Email = DbUtils.GetString(reader, "Email"),
        //            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
        //            UserType = new UserType()
        //            {
        //                Id = DbUtils.GetInt(reader, "UserTypeId"),
        //                Name = DbUtils.GetString(reader, "UserTypeName"),
        //            }
        //        }
        //    };
        //}

    }
}
