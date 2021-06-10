using Tabloid.Models;
using System;
using System.Collections.Generic;

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
        void Add(Post post);
    }
}