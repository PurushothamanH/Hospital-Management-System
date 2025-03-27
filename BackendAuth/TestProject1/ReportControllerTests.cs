using Moq;
using NUnit.Framework;
using BackendAuth.Controllers;
using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using JwtWebApiTutorial.Controllers;

namespace TestProject1
{
    public class ReportControllerTests
    {
        private Mock<Ireportservice> _mockReportService;
        private ReportController _controller;
        private ClaimsPrincipal _user;

        [SetUp]
        public void Setup()
        {
            _mockReportService = new Mock<Ireportservice>();
            _controller = new ReportController(_mockReportService.Object);

            // Create a user with Admin role for testing AddReport
            _user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                    new Claim(ClaimTypes.Role, "admin")
                }));
            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = _user }
            };
        }

        [Test]
        public async Task AddReportWhenUserIsAdminReturnsOk()
        {
            // Arrange
            var report = new Reportmodel { userid = 1, Reason = "Test Report" };
            _mockReportService.Setup(x => x.AddReport(report)).ReturnsAsync(new OkResult());

            // Act
            var result = await _controller.Addreport(report);

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
            _mockReportService.Verify(x => x.AddReport(report), Times.Once);
        }

        [Test]
        public async Task AddReport_WhenUserIsNotAdmin_ReturnsForbid()
        {
            // Arrange
            _user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                    new Claim(ClaimTypes.Role, "user")
                }));
            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = _user }
            };
            var report = new Reportmodel { userid = 1, Reason = "Test Report" };

            // Act
            var result = await _controller.Addreport(report);

            // Assert
            Assert.IsInstanceOf<ForbidResult>(result);
        }

        [Test]
        public async Task GetReportsByUserId_InvalidId_ReturnsBadRequest()
        {
            // Arrange
            var userId = -1;

            // Act
            var result = await _controller.GetReportsByUserId(userId);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual(400, badRequestResult.StatusCode);
        }

        [Test]
        public async Task GetReportsByUserIdNoReportsReturnsNotFound()
        {
            // Arrange
            var userId = 1;

            // Create a mock ClaimsPrincipal (simulating an authenticated user)
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, userId.ToString()) // Simulating userId claim
    };
            var identity = new ClaimsIdentity(claims, "mock");
            var principal = new ClaimsPrincipal(identity);

            // Set the Controller's User to the mock principal
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = principal }
            };

            // Mock that the service returns an empty list for the user
            _mockReportService.Setup(x => x.GetReportsByUserIdAsync(userId)).ReturnsAsync(new List<Reportmodel>());

            // Act
            var result = await _controller.GetReportsByUserId(userId);

            // Assert
            Assert.IsNotNull(result, "Expected result to be not null.");  // Ensure the result is not null

            // Ensure that the result is a NotFoundObjectResult
            var notFoundResult = result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult, "Expected result to be NotFoundObjectResult.");  // Assert that it is a NotFound result

            // Check the status code is 404
            Assert.That(notFoundResult.StatusCode, Is.EqualTo(404), "Expected StatusCode to be 404.");

            // Optionally, check the value of the NotFound result (e.g., message)
            Assert.That(notFoundResult.Value, Is.EqualTo("No reports found for the user."), "Expected message to match.");
        }
    }
}
