using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetById(int id);
        // public List<Post> GetAllPostsByUser();
    }
}