using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtWebApiTutorial.Controllers
{
    public class ApiResponse
    {
        public string Message { get; set; }
    }
    public class Forbidden
    {
        public string result { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly Idoctorservice _docservice;

        public DoctorController(Idoctorservice docservice)
        {
            _docservice = docservice;
        }

        [HttpPost("register")]
        [Authorize(Roles = "admin")]
        public IActionResult Adddoctor([FromBody] Doctor doc)
        {
            // Check if the user has the "Admin" role first
            if (!User.IsInRole("admin"))
            {
                // Return ForbidResult if the user is not an Admin
                return Forbid("You do not have permission to access this resource.");
            }

            // Now proceed with the rest of the validation logic
            if (doc == null)
            {
                return BadRequest("Doctor data is required.");
            }

            if (string.IsNullOrWhiteSpace(doc.name))
            {
                return BadRequest("Doctor's name is required.");
            }

            if (string.IsNullOrWhiteSpace(doc.speciality))
            {
                return BadRequest("Doctor's specialty is required.");
            }

            try
            {
                // Call the service to add the doctor
                _docservice.Adddoctor(doc);

                // Return success response
                var response = new ApiResponse { Message = "Doctor added successfully" };

                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                // Handle invalid arguments
                return BadRequest($"Invalid argument: {ex.Message}");
            }
        }



        [HttpGet("Doctorlist")]
        //[Authorize]
        public ActionResult<List<Doctor>> Get()
        {
            var doctors = _docservice.Getdoctor();
            if (doctors == null || doctors.Count == 0)
            {
                return NotFound();
            }

            return Ok(doctors);
        }

        [HttpGet("{doctorName}")]
        [Authorize]
        public ActionResult<Doctor> GetDoctorByName(string doctorName)
        {
            var doctor = _docservice.GetDoctorByName(doctorName);

            if (doctor == null)
            {
                return NotFound($"Doctor with name {doctorName} not found.");
            }

            return Ok(doctor);
        }
    }
}
