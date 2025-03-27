using BackendAuth.Models;

namespace BackendAuth.Services
{
    public interface IDashBoardservice
    {
        Task<List<Appointment>> GetUpcomingAppointments(int userid);
        Task<List<Appointment>> GetPastAppointmentsAsync(int userid);
        Task<List<Reportmodel>> GetReportsByUserId(int userid);
    }
}

