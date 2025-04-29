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
        public PasswordResetController(IPasswordResetService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> RequestReset([FromBody] PasswordResetRequestDto dto)
        {
            var req = new PasswordResetRequest {
            Email = dto.Email,
            RequestedNewPassword = dto.NewPassword,
            };

            _service.PasswordResetRequests.Add(req);
    
            await _service.SaveChangesAsync();
            return Ok(new { message = "Resetverzoek ingediend" });
        }
    }
}