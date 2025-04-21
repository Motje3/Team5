using System.ComponentModel.DataAnnotations;

namespace backend_api.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Username { get; set; }

        public required string FullName { get; set; }

        public string Role { get; set; } = "user"; // "user" or "admin"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
