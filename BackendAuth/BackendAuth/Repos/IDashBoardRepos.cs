using BackendAuth.Models;

namespace BackendAuth.Repos
{
    public interface IDashBoardRepos
    {
        Task<List<Appointment>> GetUpcomingAppointments(int userid);

        Task<List<Reportmodel>> GetReportsByUserId(int userid);
        Task<List<Appointment>> GetPastAppointmentsAsync(int userid);
    }
}
