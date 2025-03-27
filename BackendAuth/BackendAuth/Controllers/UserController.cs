using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackendAuth.Controllers
{
    public class Token
    {
        public string token { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        //private readonly Ifeedbackservice _feedbackService;s

        public UserController(IUserService userService)
        {
            _userService = userService;
            //_feedbackService = Feedbackservice;
        }

        [HttpGet("me")]
        [Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = _userService.GetMyName();
            return Ok(userName);
        }


        [HttpPost("signup")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                if (userDto == null)
                {
                    return BadRequest("User data is required.");
                }

                // Validate input fields like email
                if (string.IsNullOrEmpty(userDto.email))
                {
                    return BadRequest("Email is required.");
                }

                var user = await _userService.RegisterAsync(userDto);
                if (user != null)
                {
                    return Ok("User registered successfully");
                }
                else
                {
                    return BadRequest("User registration failed.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}"); // Ensure the exception message is passed here
            }
        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] Login request)
        {
            if (request == null)
            {
                return BadRequest("Login data is required.");
            }
            if (string.IsNullOrWhiteSpace(request.username))
            {
                return BadRequest("Username is required.");
            }
            if (string.IsNullOrWhiteSpace(request.password))
            {
                return BadRequest("Password is required.");
            }

            try
            {
                var token = await _userService.LoginAsync(request);
                var response = new Token { token = token };
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Invalid input: {ex.Message}");
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized($"Invalid username or password: {ex.Message}");
            }
        }


        [HttpGet("Profile")]
        public async Task<IActionResult> GetUserByUsername()
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = await _userService.Getuserprofile(username);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }

        //[HttpPost("feedback")]
        //[Authorize]
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
    }
}

