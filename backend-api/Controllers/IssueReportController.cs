using backend_api.Models;
using backend_api.Services;
using backend_api.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssueReportController : ControllerBase
    {
        private readonly IIssueReportService _service;

        public IssueReportController(IIssueReportService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IssueReport>>> GetAll()
        {
            var reports = await _service.GetAllAsync();
            return Ok(reports);
        }

        [HttpPost]
        public async Task<ActionResult<IssueReport>> Create([FromBody] CreateIssueReportDto dto)
        {
            var report = new IssueReport
            {
                Title = dto.Title,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                ShipmentId = dto.ShipmentId,
                ProfileId = dto.ProfileId
            };

            var created = await _service.CreateAsync(report);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
        }

    }
}
