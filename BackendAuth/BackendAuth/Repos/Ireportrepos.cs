using BackendAuth.Models;

namespace BackendAuth.Repos
{
    public interface Ireportsrepos
    {
        Task Addrepos(Reportmodel report);

        Task<IEnumerable<Reportmodel>> GetReportsByUserIdAsync(int userid);
    }
}
