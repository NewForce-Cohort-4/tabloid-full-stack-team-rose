using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Tabloid.Controllers;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {

        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id as CategoryId, c.Name, p.Id as PostId, p.Title, p.Content, 
                              p.ImageLocation,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId
                        FROM Category c
                        LEFT JOIN Post p ON c.Id = p.CategoryId";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        var categoryId = DbUtils.GetInt(reader, "CategoryId");
                        var category = categories.FirstOrDefault(c => c.Id == categoryId);

                        if (category == null)
                        {
                            category = new Category()
                            {
                                Id = categoryId,
                                Name = DbUtils.GetString(reader, "Name"),
                                Post = new List<Post>()
                            };

                            categories.Add(category);
                        }
                        if (DbUtils.IsNotDbNull(reader, "PostId"))
                        {
                            category.Post.Add(new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                CategoryId = categoryId,
                            });
                        }
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE Category WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Add(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Category (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
