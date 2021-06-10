using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }

        public string DateCreated { get; set; }

        public bool IsApproved { get; set; }

        public int CategoryId { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public DateTime PublishDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public Category Category { get; set; }
    }
}
