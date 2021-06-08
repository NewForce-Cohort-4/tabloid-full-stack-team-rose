using System;
using System.ComponentModel.DataAnnotations;
using Tabloid.Models;

namespace Tabloid.Models
{
    public class Post
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string ImageLocation { get; set; }
        
        [Required]
        public DateTime CreateDateTime { get; set; }

        public DateTime PublishDateTime { get; set; }
        [Required]
        public bool IsApproved { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
