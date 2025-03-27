using BackendAuth.Models;
using JwtWebApiTutorial;
namespace BackendAuth.Services
{
    public interface IUserService
    {
        string GetMyName();
        //public void AddUser(UserDto user);

        Task<User> RegisterAsync(UserDto request);
        Task<string> LoginAsync(Login request);
        //Task<string> RefreshTokenAsync();
        Task<User> GetUserByUsernameAsync(string username);
        Task<UserReturn> Getuserprofile(string username);
    }
}
