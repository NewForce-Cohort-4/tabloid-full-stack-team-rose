using Tabloid.Models;
using System;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetById(int id);
    }
}