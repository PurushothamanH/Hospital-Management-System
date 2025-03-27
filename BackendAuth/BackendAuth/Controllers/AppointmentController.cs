using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly Iappointmentservice _appservice;

        public AppointmentController(Iappointmentservice appservice)
        {
            _appservice = appservice;
        }

        [HttpPost("addappointment")]
        [Authorize]
        public async Task<IActionResult> Addappointment([FromBody] Appoint appoint)
        {
            try
            {
                var result = await _appservice.Addappointment(appoint);

                return Ok(result); 
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}"); 
            }
        }

        [HttpGet("getallappointments")]
        public async Task<IActionResult> GetAllAppointments()
        {
            try
            {
                var appointments = await _appservice.GetAllAppointmentsAsync();
                if (appointments == null || !appointments.Any())
                {
                    return NotFound("No appointments found.");
                }
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }

}
