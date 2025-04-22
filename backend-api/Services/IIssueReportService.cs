using backend_api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_api.Services
{
    public interface IIssueReportService
    {
        Task<IEnumerable<IssueReport>> GetAllAsync();
        Task<IssueReport> CreateAsync(IssueReport report);
    }
}
