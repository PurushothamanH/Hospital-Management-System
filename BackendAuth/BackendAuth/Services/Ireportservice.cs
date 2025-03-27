using BackendAuth.Repos;
using BackendAuth.Models;
using Microsoft.AspNetCore.Mvc;
namespace BackendAuth.Services
{
    public interface Ireportservice
    {
        public Task<IActionResult> AddReport(Reportmodel report);
        Task<IEnumerable<Reportmodel>> GetReportsByUserIdAsync(int userid);
    }
}
