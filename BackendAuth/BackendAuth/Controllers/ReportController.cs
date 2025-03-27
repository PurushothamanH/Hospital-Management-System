using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JwtWebApiTutorial.Controllers
{

    public class ReportException : Exception
    {
        public ReportException(string message) : base(message) { }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly Ireportservice _reportservice;

        public ReportController(Ireportservice reportservice)
        {
            _reportservice = reportservice;
        }

        [HttpPost("addreport")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Addreport([FromBody] Reportmodel report)
        {
            if (User.IsInRole("admin"))
            {
                try
                {
                    return await _reportservice.AddReport(report);
                }
                catch (System.Exception ex)
                {
                    return BadRequest($"Error: {ex.Message}");
            }
                }
            else
            {
                return Forbid("You do not have permission to access this resource.");
            }
        }

        [HttpGet("getreport")]
        [Authorize]

        public async Task<IActionResult> GetReportsByUserId(int userId)
        {
            try
            {
                // Retrieve userId from claims
                string userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Ensure the userIdString is not null or empty
                if (string.IsNullOrEmpty(userIdString))
                {
                    return BadRequest("User ID not found in the claims.");
                }

                int userid;

                // Attempt to convert the string to an integer
                if (!int.TryParse(userIdString, out userid))
                {
                    // If conversion fails, return an error
                    return BadRequest("Invalid user ID format.");
                }

                // Now use the parsed userid to get reports
                var reports = await _reportservice.GetReportsByUserIdAsync(userid);

                if (reports == null || !reports.Any())
                {
                    return NotFound("No reports found for the user.");
                }

                return Ok(reports);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, $"External service unavailable: {ex.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest($"An unexpected error occurred: {ex.Message}");
            }
        }

    }
}
