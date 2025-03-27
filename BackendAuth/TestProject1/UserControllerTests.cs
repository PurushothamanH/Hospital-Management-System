using Moq;
using NUnit.Framework;
using BackendAuth.Controllers;
using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using JwtWebApiTutorial;

namespace TestProject1
{
    public class UserControllerTests
    {
        private Mock<IUserService> _mockUserService;
        private UserController _userController;

        [SetUp]
        public void Setup()
        {
            _mockUserService = new Mock<IUserService>();
            _userController = new UserController(_mockUserService.Object);
        }

        [Test]
        public async Task Register_ShouldReturnOk_WhenUserIsRegisteredSuccessfully()
        {
            // Arrange
            var userDto = new UserDto { username = "newUser", password = "password123", email = "user@example.com" };
            var user = new User { username = userDto.username, password = userDto.password };

            // Setup the mock to return the created user
            _mockUserService.Setup(service => service.RegisterAsync(userDto)).ReturnsAsync(user);

            // Act
            var result = await _userController.Register(userDto);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual("User registered successfully", okResult.Value);
        }

        [Test]
        public async Task Register_ShouldReturnBadRequest_WhenEmailIsNull()
        {
            // Arrange
            var userDto = new UserDto { username = "newUser", password = "password123" };

            // Act
            var result = await _userController.Register(userDto);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual("Email is required.", badRequestResult.Value);
        }

        [Test]
        public async Task Register_ShouldReturnBadRequest_WhenRegistrationFails()
        {
            // Arrange
            var userDto = new UserDto { username = "newUser", password = "password123", email = "user@example.com" };

            // Setup mock service to return null (indicating failure)
            _mockUserService.Setup(service => service.RegisterAsync(userDto)).ReturnsAsync((User)null);

            // Act
            var result = await _userController.Register(userDto);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual("User registration failed.", badRequestResult.Value);
        }

        [Test]
        public async Task Login_ShouldReturnOk_WhenUserLogsInSuccessfully()
        {
            // Arrange
            var loginRequest = new Login { username = "existingUser", password = "password123" };
            var token = "fake-jwt-token";

            // Setup mock service to return a token
            _mockUserService.Setup(service => service.LoginAsync(loginRequest)).ReturnsAsync(token);

            // Act
            var result = await _userController.Login(loginRequest);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            var response = okResult.Value as Token;
            Assert.IsNotNull(response);
            Assert.AreEqual(token, response.token);
        }

        [Test]
        public async Task Login_ShouldReturnBadRequest_WhenLoginDataIsInvalid()
        {
            // Arrange
            var loginRequest = new Login { username = "existingUser", password = "" }; // Invalid password

            // Act
            var result = await _userController.Login(loginRequest);

            // Assert
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual("Password is required.", badRequestResult.Value);
        }

        [Test]
        public async Task Login_ShouldReturnUnauthorized_WhenUserNotFound()
        {
            // Arrange
            var loginRequest = new Login { username = "nonExistingUser", password = "wrongPassword" };

            // Setup mock service to throw UnauthorizedAccessException
            _mockUserService.Setup(service => service.LoginAsync(loginRequest)).ThrowsAsync(new UnauthorizedAccessException("Invalid username or password"));

            // Act
            var result = await _userController.Login(loginRequest);

            // Assert
            var unauthorizedResult = result.Result as UnauthorizedObjectResult;
            Assert.IsNotNull(unauthorizedResult);
            Assert.AreEqual(401, unauthorizedResult.StatusCode);
            Assert.AreEqual("Invalid username or password: Invalid username or password", unauthorizedResult.Value);
        }

        [Test]
        public void GetMe_ShouldReturnOk_WhenUserIsAuthenticated()
        {
            // Arrange
            var userName = "authenticatedUser";
            _mockUserService.Setup(service => service.GetMyName()).Returns(userName);

            // Act
            var result = _userController.GetMe();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(userName, okResult.Value);
        }
    }
}

