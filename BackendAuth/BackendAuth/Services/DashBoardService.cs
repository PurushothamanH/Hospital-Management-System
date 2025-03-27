
using BackendAuth.Models;
using BackendAuth.Repos;
using BackendAuth.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

public class DashboardService : IDashBoardservice
{
    private readonly IDashBoardRepos _repository;

    public DashboardService(IDashBoardRepos repository)
    {
        _repository = repository;
    }

    public async Task<List<Appointment>> GetUpcomingAppointments(int userid)
    {
        var appointments = await _repository.GetUpcomingAppointments(userid);
        return appointments ?? new List<Appointment>();  // Return an empty list if null
    }

    public async Task<List<Appointment>> GetPastAppointmentsAsync(int userid)
    {
        var appointments = await _repository.GetPastAppointmentsAsync(userid);
        return appointments ?? new List<Appointment>();  // Return an empty list if null
    }

    public async Task<List<Reportmodel>> GetReportsByUserId(int userid)
    {
        var reports = await _repository.GetReportsByUserId(userid);
        return reports ?? new List<Reportmodel>();  // Return an empty list if null
    }
}
