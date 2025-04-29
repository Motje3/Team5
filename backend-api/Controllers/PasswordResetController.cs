using backend_api.Models;
using backend_api.Services;
using backend_api.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordResetController : ControllerBase
    {
        private readonly IPasswordResetService _service;

        public PasswordResetController(IPasswordResetService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> RequestReset([FromBody] PasswordResetRequestDto dto)
        {
            await _service.CreateAsync(dto);
            return Ok(new { message = "Resetverzoek ingediend" });
        }
    }
}
