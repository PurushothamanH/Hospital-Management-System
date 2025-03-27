using BackendAuth.Models;
using BackendAuth.Repos;
using JwtWebApiTutorial;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BackendAuth.Services
{   
    public class Appointmentservice : Iappointmentservice
    {
        private readonly Iappointmentrepos _appointmentrepos;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public Appointmentservice(Iappointmentrepos appointmentrepos, IHttpContextAccessor httpContextAccessor)
        {
            _appointmentrepos = appointmentrepos;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<IActionResult> Addappointment(Appoint appoint)
        {
            var existingAppointment = await _appointmentrepos.GetAppointmentByDoctorAndDateAsync(appoint.Doctorname, appoint.speciality,appoint.AppointmentDate);

            if (existingAppointment != null)
            {
                return new ConflictObjectResult(new { Message = "The doctor is already booked for this time." });
            }

            var userIdString = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return new BadRequestObjectResult("User ID not found in the claims.");
            }
            if (!int.TryParse(userIdString, out int userId))
            {
                return new BadRequestObjectResult("Invalid user ID format.");
            }


            var appointment = new Appointment()
            {
                userid = userId,
                Doctorname = appoint.Doctorname,
                Patientname = appoint.Patientname,
                AppointmentDate = appoint.AppointmentDate,
                speciality = appoint.speciality,
                Reason = appoint.Reason
            };

            await _appointmentrepos.AddappointmentAsync(appointment);

            return new OkObjectResult(new { Message = "Appointment booked successfully." });
        }

        public async Task<List<Appoint>> GetAllAppointmentsAsync()
        {
            var appointments = await _appointmentrepos.GetAllAppointmentsAsync();
            var appointList = appointments.Select(appointment => new Appoint
            {
                Patientname = appointment.Patientname,
                Doctorname = appointment.Doctorname,        
                speciality = appointment.speciality,        
                AppointmentDate = appointment.AppointmentDate, 
                Reason = appointment.Reason                 
            }).ToList();

            return appointList;
        }

    }
}
