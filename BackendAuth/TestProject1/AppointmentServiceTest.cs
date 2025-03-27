
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using BackendAuth.Models;
using BackendAuth.Repos;
using BackendAuth.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace BackendAuth.Tests
{
    [TestFixture]
    public class AppointmentserviceTests
    {
        private Mock<Iappointmentrepos> _mockAppointmentRepos;
        private Mock<IHttpContextAccessor> _mockHttpContextAccessor;
        private Appointmentservice _appointmentService;

        [SetUp]
        public void Setup()
        {
            _mockAppointmentRepos = new Mock<Iappointmentrepos>();
            _mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            _appointmentService = new Appointmentservice(_mockAppointmentRepos.Object, _mockHttpContextAccessor.Object);
        }

        [Test]
        public async Task Addappointment_ShouldReturnConflict_WhenDoctorIsAlreadyBooked()
        {
            // Arrange
            var appoint = new Appoint { Doctorname = "Dr. Smith", speciality = "Cardiology", AppointmentDate = DateTime.Now };
            _mockAppointmentRepos.Setup(repo => repo.GetAppointmentByDoctorAndDateAsync(appoint.Doctorname, appoint.speciality, appoint.AppointmentDate)).ReturnsAsync(new Appointment());

            // Act
            var result = await _appointmentService.Addappointment(appoint);

            // Assert
            Assert.IsInstanceOf<ConflictObjectResult>(result);
        }

        [Test]
        public async Task Addappointment_ShouldReturnBadRequest_WhenUserIdIsMissing()
        {
            // Arrange
            var appoint = new Appoint { Doctorname = "Dr. Smith", speciality = "Cardiology", AppointmentDate = DateTime.Now };
            _mockHttpContextAccessor.Setup(x => x.HttpContext).Returns(new DefaultHttpContext());
            _mockAppointmentRepos.Setup(repo => repo.GetAppointmentByDoctorAndDateAsync(appoint.Doctorname, appoint.speciality, appoint.AppointmentDate)).ReturnsAsync((Appointment)null);

            // Act
            var result = await _appointmentService.Addappointment(appoint);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Addappointment_ShouldReturnOk_WhenAppointmentIsBookedSuccessfully()
        {
            // Arrange
            var appoint = new Appoint { Doctorname = "Dr. Smith", speciality = "Cardiology", AppointmentDate = DateTime.Now, Patientname = "John Doe", Reason = "Checkup" };
            var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, "1") };
            var identity = new ClaimsIdentity(claims);
            var principal = new ClaimsPrincipal(identity);
            var context = new DefaultHttpContext { User = principal };

            _mockHttpContextAccessor.Setup(x => x.HttpContext).Returns(context);
            _mockAppointmentRepos.Setup(repo => repo.GetAppointmentByDoctorAndDateAsync(appoint.Doctorname, appoint.speciality, appoint.AppointmentDate)).ReturnsAsync((Appointment)null);
            _mockAppointmentRepos.Setup(repo => repo.AddappointmentAsync(It.IsAny<Appointment>())).Returns(Task.CompletedTask);

            // Act
            var result = await _appointmentService.Addappointment(appoint);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetAllAppointmentsAsync_ShouldReturnListOfAppointments()
        {
            // Arrange
            var appointments = new List<Appointment>
            {
                new Appointment { Doctorname = "Dr. Smith", Patientname = "John Doe", speciality = "Cardiology", AppointmentDate = DateTime.Now, Reason = "Checkup" },
                new Appointment { Doctorname = "Dr. Brown", Patientname = "Jane Doe", speciality = "Dermatology", AppointmentDate = DateTime.Now, Reason = "Skin rash" }
            };
            _mockAppointmentRepos.Setup(repo => repo.GetAllAppointmentsAsync()).ReturnsAsync(appointments);

            // Act
            var result = await _appointmentService.GetAllAppointmentsAsync();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Dr. Smith", result[0].Doctorname);
        }
    }
}
