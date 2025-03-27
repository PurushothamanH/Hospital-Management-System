using BackendAuth.Models;
using BackendAuth.Repos;
using BackendAuth.Services;
using Microsoft.Extensions.DependencyModel;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestProject1
{
    [TestFixture]
    public class DashboardServiceTests
    {
        private Mock<IDashBoardRepos> _mockRepository;
        private DashboardService _dashboardService;
        //private Mock<IDependency> _mockDependency; // Assuming DashBoardRepos has a dependency that needs to be mocked

        [SetUp]
        public void SetUp()
        {
            _mockRepository = new Mock<IDashBoardRepos>();
            _dashboardService = new DashboardService(_mockRepository.Object);
        }

        [Test]
        public async Task GetUpcomingAppointments_ShouldReturnAppointments_WhenUserHasUpcomingAppointments()
        {
            // Arrange
            var userId = 1;
            var upcomingAppointments = new List<Appointment>
            {
                new Appointment { Doctorname = "Dr. Smith", Patientname = "John Doe", AppointmentDate = DateTime.Now.AddDays(1) }
            };

            // Mock the repository method to return upcoming appointments
            _mockRepository.Setup(repo => repo.GetUpcomingAppointments(userId)).ReturnsAsync(upcomingAppointments);

            // Act
            var result = await _dashboardService.GetUpcomingAppointments(userId);

            // Assert
            Assert.NotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].Doctorname, Is.EqualTo("Dr. Smith"));
            Assert.That(result[0].Patientname, Is.EqualTo("John Doe"));
        }

        [Test]
        public async Task GetUpcomingAppointments_ShouldReturnEmptyList_WhenNoUpcomingAppointments()
        {
            // Arrange
            var userId = 1;

            // Ensure mock returns an empty list, not null
            _mockRepository.Setup(repo => repo.GetUpcomingAppointments(userId)).ReturnsAsync(new List<Appointment>());

            // Act
            var result = await _dashboardService.GetUpcomingAppointments(userId);

            // Assert
            Assert.NotNull(result);  // Ensure result is not null
            Assert.That(result.Count, Is.EqualTo(0));  // Ensure result is an empty list
        }

        [Test]
        public async Task GetPastAppointmentsAsync_ShouldReturnPastAppointments_WhenUserHasPastAppointments()
        {
            // Arrange
            var userId = 1;
            var pastAppointments = new List<Appointment>
            {
                new Appointment { Doctorname = "Dr. Johnson", Patientname = "Jane Doe", AppointmentDate = DateTime.Now.AddDays(-1) }
            };
            _mockRepository.Setup(repo => repo.GetPastAppointmentsAsync(userId)).ReturnsAsync(pastAppointments);

            // Act
            var result = await _dashboardService.GetPastAppointmentsAsync(userId);

            // Assert
            Assert.NotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].Doctorname, Is.EqualTo("Dr. Johnson"));
            Assert.That(result[0].Patientname, Is.EqualTo("Jane Doe"));
        }

        [Test]
        public async Task GetPastAppointmentsAsync_ShouldReturnEmptyList_WhenNoPastAppointments()
        {
            // Arrange
            var userId = 1;
            _mockRepository.Setup(repo => repo.GetPastAppointmentsAsync(userId)).ReturnsAsync(new List<Appointment>());

            // Act
            var result = await _dashboardService.GetPastAppointmentsAsync(userId);

            // Assert
            Assert.NotNull(result);
            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task GetReportsByUserId_ShouldReturnReports_WhenUserHasReports()
        {
            // Arrange
            var userId = 1;
            var reports = new List<Reportmodel>
            {
                new Reportmodel { Reason = "Blood Test" }
            };
            _mockRepository.Setup(repo => repo.GetReportsByUserId(userId)).ReturnsAsync(reports);

            // Act
            var result = await _dashboardService.GetReportsByUserId(userId);

            // Assert
            Assert.NotNull(result);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].Reason, Is.EqualTo("Blood Test"));
        }

        [Test]
        public async Task GetReportsByUserId_ShouldReturnEmptyList_WhenNoReportsForUser()
        {
            // Arrange
            var userId = 1;

            // Ensure mock returns an empty list, not null
            _mockRepository.Setup(repo => repo.GetReportsByUserId(userId)).ReturnsAsync(new List<Reportmodel>());

            // Act
            var result = await _dashboardService.GetReportsByUserId(userId);

            // Assert
            Assert.NotNull(result);  // Ensure result is not null
            Assert.That(result.Count, Is.EqualTo(0));  // Ensure result is an empty list
        }
    }
}
