using backend_api.DTOs;
using backend_api.Models;
using backend_api.Data;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly AppDbContext _context;

        public PasswordResetService(AppDbContext context)
        {
            _context = context;
        }
    }
}
