using System;
using System.ComponentModel.DataAnnotations;

namespace backend_api.Models
{
    public class Shipment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Status { get; set; }

        public string Destination { get; set; }

        public string ExpectedDelivery { get; set; }

        public string? Weight { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
