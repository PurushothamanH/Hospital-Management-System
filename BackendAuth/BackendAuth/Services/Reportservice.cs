using BackendAuth.Models;
using BackendAuth.Repos;
using Microsoft.AspNetCore.Mvc;
namespace BackendAuth.Services
{
    public class Reportservice : Ireportservice
    {
        private readonly Ireportsrepos _reportsrepos;
        public Reportservice(Ireportsrepos reportsrepos)
        {
            _reportsrepos = reportsrepos;
        }
        public async Task<IActionResult> AddReport(Reportmodel report)
        {
            try
            {
                _reportsrepos.Addrepos(report);
                return new OkObjectResult("Report added successfully");
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult("Error adding report");
            }

        }

        public async Task<IEnumerable<Reportmodel>> GetReportsByUserIdAsync(int userid)
        {
            return await _reportsrepos.GetReportsByUserIdAsync(userid);
        }
    }
}
