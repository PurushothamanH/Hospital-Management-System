
using BackendAuth.Models;
using BackendAuth.Repos;
using MongoDB.Driver;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using System.Threading.Tasks;
using JwtWebApiTutorial;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using BackendAuth.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendAuth.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Iuserrepos _userRepos; // Inject Iuserrepos
        private readonly IConfiguration _configuration; // Inject IConfiguration for token generation
        //private readonly IFeedbackService _feedbackService;

        public UserService(IHttpContextAccessor httpContextAccessor, Iuserrepos userRepos, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepos = userRepos;
            _configuration = configuration;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return result;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _userRepos.GetUserByUsernameAsync(username);
        }

        public async Task<User> RegisterAsync(UserDto userDto)
        {
            var userId = GenerateUserId(); // You can use a custom method for this

            CreatePasswordHash(userDto.password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                userid = userId, // Use the generated userId
                username = userDto.username,
                email = userDto.email,
                contact = userDto.contact,
                dob = userDto.dob,
                passwordhash = passwordHash,
                passwordsalt = passwordSalt
            };

            // Add user to the database (async)
            await _userRepos.AddUserAsync(user);

            return user;
        }

        public async Task<UserReturn> Getuserprofile(string username)
        {
            return await _userRepos.Getuserprofile(username);
        }

        private int GenerateUserId()
        {
            // Generate a random userId, you can use other methods to generate unique IDs
            Random rand = new Random();
            return rand.Next(100,200); // This generates a random 4-digit number
        }

        //[HttpPost("submit-feedback")]
        //public async Task<IActionResult> SubmitFeedback([FromBody] Feedback feedback)
        //{
        //    if (feedback == null)
        //    {
        //        return BadRequest("Feedback data is required.");
        //    }

        //    var result = await _feedbackService.SubmitFeedbackAsync(feedback);

        //    if (result)
        //    {
        //        return Ok(new { message = "Feedback submitted successfully." });
        //    }

        //    return StatusCode(500, "Internal server error while saving feedback.");
        //}


        public async Task<string> LoginAsync(Login request)
        {
            var user = await _userRepos.GetUserByUsernameAsync(request.username);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            if (!VerifyPasswordHash(request.password, user.passwordhash, user.passwordsalt))
            {
                throw new Exception("Invalid password.");
            }

            return CreateToken(user);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.role),
                new Claim(ClaimTypes.NameIdentifier, user.userid.ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, "JwtAudience"),
                new Claim(JwtRegisteredClaimNames.Iss,"JwtIssuer")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}


