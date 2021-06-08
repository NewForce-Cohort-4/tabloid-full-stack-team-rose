using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        //void Add(Post post);
        //List<Post> GetAll();
        //object GetbyId(int id);
        public List<Post> GetAllPostsByUser();
    }
}
