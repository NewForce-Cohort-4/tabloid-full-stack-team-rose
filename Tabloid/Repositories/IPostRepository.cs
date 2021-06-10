using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

// namespace Tabloid.Repositories
// {
//     public interface IPostRepository
//     {
namespace Tabloid.Controllers
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetById(int id);
        void Update(Post post);
        List<Post> GetAllPostsByUser(int userProfileId);

    }
}