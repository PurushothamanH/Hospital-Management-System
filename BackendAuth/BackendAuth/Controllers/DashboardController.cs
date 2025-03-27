using BackendAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackendAuth.Controllers
{
    public class DashboardData
    {
        public object UpcomingAppointments { get; set; }
        public object PastAppointments { get; set; }
        public object Reports { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashBoardservice _boardservice;

        public DashboardController(IDashBoardservice boardservice)
        {
            _boardservice = boardservice;
        }

        //[HttpGet("userdashboard")]
        //[Authorize]
        //public async Task<IActionResult> GetUserDashboardData(int userId)
        //{
        //    string userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    int userid;

        //    // Attempt to convert the string to an integer
        //    if (!int.TryParse(userIdString, out userid))
        //    {
        //        // If conversion fails, return an error or handle it appropriately
        //        return BadRequest("Invalid user ID format.");
        //    }
        //    // Now, you can use `userId` as an integer
        //    var upcomingAppointments = await _boardservice.GetUpcomingAppointments(userid);

        //    if (!upcomingAppointments.Any())
        //    {
        //        upcomingAppointments = null; // Set to null if no upcoming appointments found
        //    }

        //    var pastAppointments = await _boardservice.GetPastAppointmentsAsync(userid);
        //    if (!pastAppointments.Any())
        //    {
        //        pastAppointments = null; // Set to null if no past appointments found
        //    }

        //    var reports = await _boardservice.GetReportsByUserId(userid);
        //    if (!reports.Any())
        //    {
        //        reports = null; // Set to null if no reports found
        //    }

        //    //var dashboardData = new
        //    //{
        //    //    UpcomingAppointments = upcomingAppointments,
        //    //    PastAppointments = pastAppointments,
        //    //    Reports = reports
        //    //};

        //    // This is because we are using the dynamic object and we dont have an direct method to access the variables...so we use like below and create an class for it

        //    var dashboardData = new DashboardData
        //    {
        //        UpcomingAppointments = upcomingAppointments,
        //        PastAppointments = pastAppointments,
        //        Reports = reports
        //    };


        //    return Ok(dashboardData);
        //}


        [HttpGet("userdashboard")]
        [Authorize]
        public async Task<IActionResult> GetUserDashboardData()
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

            // Fetch upcoming appointments
            var upcomingAppointments = await _boardservice.GetUpcomingAppointments(userid);
            if (!upcomingAppointments.Any())
            {
                upcomingAppointments = null; // Set to null if no upcoming appointments found
            }

            // Fetch past appointments
            var pastAppointments = await _boardservice.GetPastAppointmentsAsync(userid);
            if (!pastAppointments.Any())
            {
                pastAppointments = null; // Set to null if no past appointments found
            }

            // Fetch reports
            var reports = await _boardservice.GetReportsByUserId(userid);
            if (!reports.Any())
            {
                reports = null; // Set to null if no reports found
            }

            // Return dashboard data in a structured format
            var dashboardData = new DashboardData
            {
                UpcomingAppointments = upcomingAppointments,
                PastAppointments = pastAppointments,
                Reports = reports
            };

            return Ok(dashboardData);
        }

    }
}
