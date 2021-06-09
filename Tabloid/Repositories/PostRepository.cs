using System;
using System.Linq;
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
        // public Post GetById(int id){}


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

        public Post GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
