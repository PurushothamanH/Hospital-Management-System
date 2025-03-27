using BackendAuth.Models;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace BackendAuth.Repos
{
    public interface Iappointmentrepos
    {
        Task<Appointment> GetAppointmentByDoctorAndDateAsync(string doctorname, string speciality, DateTime AppointmentDate);

        Task AddappointmentAsync(Appointment appoin);
        Task<List<Appointment>> GetAllAppointmentsAsync();
    }
}
