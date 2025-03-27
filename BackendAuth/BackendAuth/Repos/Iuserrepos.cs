using BackendAuth.Models;
using JwtWebApiTutorial;
using System.Threading.Tasks;

namespace BackendAuth.Repos
{
    public interface Iuserrepos
    {
        Task AddUserAsync(User user);
        Task<User> GetUserByUsernameAsync(string username);
        Task<UserReturn> Getuserprofile(string username);
    }
}
