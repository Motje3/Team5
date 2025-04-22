using backend_api.Data;
using backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Services
{
    public class IssueReportService : IIssueReportService
    {
        private readonly AppDbContext _context;

        public IssueReportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<IssueReport>> GetAllAsync()
        {
            return await _context.IssueReports.Include(r => r.Shipment).ToListAsync();
        }

        public async Task<IssueReport> CreateAsync(IssueReport report)
        {
            _context.IssueReports.Add(report);
            await _context.SaveChangesAsync();
            return report;
        }
    }
}
