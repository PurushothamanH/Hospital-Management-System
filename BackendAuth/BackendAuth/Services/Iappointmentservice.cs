using BackendAuth.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BackendAuth.Services
{
    public interface Iappointmentservice
    {
        Task<IActionResult> Addappointment(Appoint appoint);
        Task<List<Appoint>> GetAllAppointmentsAsync();
    }
}
