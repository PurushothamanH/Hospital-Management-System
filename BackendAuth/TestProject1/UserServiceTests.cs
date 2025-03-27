using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BackendAuth.Models;
using BackendAuth.Repos;
using BackendAuth.Services;
using JwtWebApiTutorial;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;

namespace BackendAuth.Tests
{
    [TestFixture]
    public class UserServiceTests
    {
        private Mock<IHttpContextAccessor> _mockHttpContextAccessor;
        private Mock<Iuserrepos> _mockUserRepos;
        private Mock<IConfiguration> _mockConfiguration;
        private UserService _userService;

        [SetUp]
        public void Setup()
        {
            _mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockUserRepos = new Mock<Iuserrepos>();
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(config => config["AppSettings:Token"]).Returns("supersecrettoken");
            _userService = new UserService(_mockHttpContextAccessor.Object, _mockUserRepos.Object, _mockConfiguration.Object);
        }

        [Test]
        public void GetMyName_ShouldReturnUserName_WhenHttpContextExists()
        {
            // Arrange
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, "TestUser") };
            var identity = new ClaimsIdentity(claims);
            var principal = new ClaimsPrincipal(identity);
            var context = new DefaultHttpContext { User = principal };
            _mockHttpContextAccessor.Setup(x => x.HttpContext).Returns(context);

            // Act
            var result = _userService.GetMyName();

            // Assert
            Assert.AreEqual("TestUser", result);
        }

        [Test]
        public async Task RegisterAsync_ShouldReturnUser_WhenRegistrationIsSuccessful()
        {
            // Arrange
            var userDto = new UserDto { username = "TestUser", password = "password", email = "test@test.com", contact = 1234567890, dob = DateTime.Now.ToString("yyyy-MM-dd") };
            _mockUserRepos.Setup(repo => repo.AddUserAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

            // Act
            var result = await _userService.RegisterAsync(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("TestUser", result.username);
        }

        [Test]
        public async Task LoginAsync_ShouldReturnToken_WhenCredentialsAreValid()
        {
            // Arrange
            var loginRequest = new Login { username = "TestUser", password = "password" };
            var user = new User { userid = 1, username = "TestUser", passwordhash = Encoding.UTF8.GetBytes("hash"), passwordsalt = Encoding.UTF8.GetBytes("salt"), role = "User" };
            _mockUserRepos.Setup(repo => repo.GetUserByUsernameAsync("TestUser")).ReturnsAsync(user);

            // Act & Assert
            Assert.ThrowsAsync<Exception>(async () => await _userService.LoginAsync(loginRequest));
        }
    }
}
