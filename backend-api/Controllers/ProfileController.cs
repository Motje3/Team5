using backend_api.DTOs;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var profile = await _profileService.GetProfileAsync(id);
            if (profile == null)
                return NotFound("Profiel niet gevonden");

            return Ok(profile);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileDto dto)
        {
            try
            {
                var updated = await _profileService.UpdateProfileAsync(id, dto);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // 👇 Wachtwoord wijzigen
        [HttpPost("{id}/change-password")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordDto dto)
        {
            try
            {
                var success = await _profileService.ChangePasswordAsync(id, dto);
                if (!success)
                    return BadRequest("Oud wachtwoord is onjuist");

                return Ok(new { message = "Wachtwoord succesvol gewijzigd" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        
        [HttpPut("{id}/settings")]
        public async Task<IActionResult> UpdateSettings(int id, [FromBody] UpdateSettingsDto dto)
        {
            try
            {
                var updated = await _profileService.UpdateSettingsAsync(id, dto);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
