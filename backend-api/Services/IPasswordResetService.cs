using backend_api.DTOs;
using backend_api.Models;

namespace backend_api.Services
{
    public interface IPasswordResetService
    {
        Task<PasswordResetRequest> CreateAsync(PasswordResetRequestDto dto);
        Task<IEnumerable<PasswordResetRequest>> GetAllAsync();
        Task<bool> MarkAsProcessed(int id);
    }
}