using System.ComponentModel.DataAnnotations;

namespace backend_api.Models
{
    public class Statistic
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ScannedCount { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        // Optional: link to a user/profile if needed
        public int? ProfileId { get; set; }
    }
}
