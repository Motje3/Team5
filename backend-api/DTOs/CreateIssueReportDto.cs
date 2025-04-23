using System.ComponentModel.DataAnnotations;

namespace backend_api.DTOs
{
    public class CreateIssueReportDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public string? ImageUrl { get; set; }

        public int? ShipmentId { get; set; }

        public int? ProfileId { get; set; }
    }
}
