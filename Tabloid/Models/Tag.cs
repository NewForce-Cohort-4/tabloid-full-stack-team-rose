﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Length { get; internal set; }

        public override string ToString()
        {
            return Name;
        }
    }
}
