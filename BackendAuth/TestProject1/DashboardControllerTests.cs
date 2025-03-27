
using BackendAuth.Controllers;
using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TestProject1
{
    [TestFixture]
    public class DashboardControllerTests
    {
        private Mock<IDashBoardservice> _mockBoardService;
        private DashboardController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockBoardService = new Mock<IDashBoardservice>();
            _controller = new DashboardController(_mockBoardService.Object);

            var userid = 1;
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userid.ToString())
            };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = claimsPrincipal }
            };
        }

        [Test]
        public async Task GetUserDashboardDataShouldReturnEmptyDataWhenNoAppointmentsOrReportsFound()
        {
            // Arrange
            var userid = 1;

            // Set up mock service methods to return empty data
            _mockBoardService.Setup(service => service.GetUpcomingAppointments(userid))
                             .ReturnsAsync(new List<Appointment>());
            _mockBoardService.Setup(service => service.GetPastAppointmentsAsync(userid))
                             .ReturnsAsync(new List<Appointment>());
            _mockBoardService.Setup(service => service.GetReportsByUserId(userid))
                             .ReturnsAsync(new List<Reportmodel>());

            // Act
            var result = await _controller.GetUserDashboardData();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var dashboardData = okResult.Value as DashboardData;
            Assert.NotNull(dashboardData);
            Assert.IsNull(dashboardData.UpcomingAppointments);
            Assert.IsNull(dashboardData.PastAppointments);
            Assert.IsNull(dashboardData.Reports);
        }

        [Test]
        public async Task GetUserDashboardData_ShouldReturnUpcomingAppointments_WhenFound()
        {
            // Arrange
            var userid = 1;
            var upcomingAppointments = new List<Appointment> { new Appointment { AppointmentDate = new DateTime(2025, 2, 10) } };

            _mockBoardService.Setup(service => service.GetUpcomingAppointments(userid))
                             .ReturnsAsync(upcomingAppointments);
            _mockBoardService.Setup(service => service.GetPastAppointmentsAsync(userid))
                             .ReturnsAsync(new List<Appointment>());
            _mockBoardService.Setup(service => service.GetReportsByUserId(userid))
                             .ReturnsAsync(new List<Reportmodel>());

            // Act
            var result = await _controller.GetUserDashboardData();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var dashboardData = okResult.Value as DashboardData;
            Assert.NotNull(dashboardData);
            Assert.That(dashboardData.UpcomingAppointments, Is.EqualTo(upcomingAppointments));
        }

        [Test]
        public async Task GetUserDashboardData_ShouldReturnPastAppointments_WhenFound()
        {
            // Arrange
            var userId = 1;
            var pastAppointments = new List<Appointment> { new Appointment { AppointmentDate = new DateTime(2025, 1, 10) } };

            _mockBoardService.Setup(service => service.GetUpcomingAppointments(userId))
                             .ReturnsAsync(new List<Appointment>());
            _mockBoardService.Setup(service => service.GetPastAppointmentsAsync(userId))
                             .ReturnsAsync(pastAppointments);
            _mockBoardService.Setup(service => service.GetReportsByUserId(userId))
                             .ReturnsAsync(new List<Reportmodel>());

            // Act
            var result = await _controller.GetUserDashboardData();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var dashboardData = okResult.Value as DashboardData;
            Assert.NotNull(dashboardData);
            Assert.That(dashboardData.PastAppointments, Is.EqualTo(pastAppointments));
        }

        [Test]
        public async Task GetUserDashboardData_ShouldReturnReports_WhenFound()
        {
            // Arrange
            var userid = 1;
            var reports = new List<Reportmodel> { new Reportmodel { Reason = "Report 1" } };

            _mockBoardService.Setup(service => service.GetUpcomingAppointments(userid))
                             .ReturnsAsync(new List<Appointment>());
            _mockBoardService.Setup(service => service.GetPastAppointmentsAsync(userid))
                             .ReturnsAsync(new List<Appointment>());
            _mockBoardService.Setup(service => service.GetReportsByUserId(userid))
                             .ReturnsAsync(reports);

            // Act
            var result = await _controller.GetUserDashboardData();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var dashboardData = okResult.Value as DashboardData;
            Assert.NotNull(dashboardData);
            Assert.That(dashboardData.Reports, Is.EqualTo(reports));
        }
    }
}
