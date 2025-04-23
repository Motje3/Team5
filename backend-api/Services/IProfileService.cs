using backend_api.DTOs;
using backend_api.Models;

namespace backend_api.Services
{
    public interface IProfileService
    {
        Task<Profile?> GetProfileAsync(int id);
        Task<Profile> UpdateProfileAsync(int id, UpdateProfileDto dto);
        Task<bool> ChangePasswordAsync(int id, ChangePasswordDto dto); // 👈 toegevoegd
        Task<Profile> UpdateSettingsAsync(int id, UpdateSettingsDto dto);

    }
}
