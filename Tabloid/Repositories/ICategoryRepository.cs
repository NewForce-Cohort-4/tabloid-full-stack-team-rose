using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        void Delete(int id);
        void Add(Category category);
        void Update(Category category);
        Category GetById(int id);
    }
}
    

