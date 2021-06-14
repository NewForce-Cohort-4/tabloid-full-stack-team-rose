using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

// namespace Tabloid.Repositories
// {
//     public interface IPostRepository
//     {
namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetById(int id);
        void Delete(int id);

        List<Post> GetAllPostsByUser(int userProfileId);
        void Update(Post post);
        void Add(Post post);
    }
}