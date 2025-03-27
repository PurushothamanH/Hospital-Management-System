
using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using JwtWebApiTutorial.Controllers;
using System.Collections.Generic;
using System.Security.Claims;

namespace TestProject1
{
    [TestFixture]
    public class DoctorControllerTests
    {
        private Mock<Idoctorservice> _mockDoctorService;
        private DoctorController _doctorController;

        [SetUp]
        public void Setup()
        {
            // Mock the Idoctorservice dependency
            _mockDoctorService = new Mock<Idoctorservice>();

            // Initialize the controller with the mocked service
            _doctorController = new DoctorController(_mockDoctorService.Object);
        }

        // Test AddDoctor method
        [Test]
        public void AddDoctorShouldReturnOkWhenUserIsAdmin()
        {
            // Arrange
            var doctor = new Doctor { name = "Dr. Smith", speciality = "Cardiology" }; // Ensure the required fields are set

            // Setup mock service to perform Adddoctor (no specific return value needed here)
            _mockDoctorService.Setup(service => service.Adddoctor(It.IsAny<Doctor>())).Verifiable();

            // Add admin role to the User (simulating an admin user)
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, "admin") }));
            _doctorController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = _doctorController.Adddoctor(doctor);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.NotNull(okResult.Value);

            var value = okResult.Value as ApiResponse;
            Assert.NotNull(value);
            Assert.That(value.Message, Is.EqualTo("Doctor added successfully"));

            // Verify that the Adddoctor method in the service was called once
            _mockDoctorService.Verify(service => service.Adddoctor(It.IsAny<Doctor>()), Times.Once);
        }

        [Test]
        public void AddDoctor_ShouldReturnForbid_WhenUserIsNotAdmin()
        {
            // Arrange
            var doctor = new Doctor { name = "Dr. Smith" };

            // Setup mock service to perform Adddoctor (no specific return value needed here)
            _mockDoctorService.Setup(service => service.Adddoctor(It.IsAny<Doctor>())).Verifiable();

            // Add non-admin role to the User
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, "User") }));
            _doctorController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = _doctorController.Adddoctor(doctor);

            // Assert
            Assert.That(result, Is.InstanceOf<ForbidResult>());

            // Optionally, verify the service method is not called, as the user is not authorized to add a doctor
            _mockDoctorService.Verify(service => service.Adddoctor(It.IsAny<Doctor>()), Times.Never);
        }

        // Test Get method
        [Test]
        public void GetDoctors_ShouldReturnOk_WhenDoctorsExist()
        {
            // Arrange
            var doctors = new List<Doctor>
            {
                new Doctor { name = "Dr. Smith" },
                new Doctor { name = "Dr. Johnson" }
            };

            _mockDoctorService.Setup(service => service.Getdoctor()).Returns(doctors);

            // Add a role to the user
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, "User") }));
            _doctorController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = _doctorController.Get();

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = result.Result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.That(okResult.Value, Is.EqualTo(doctors));
        }

        [Test]
        public void GetDoctors_ShouldReturnNotFound_WhenNoDoctorsExist()
        {
            // Arrange
            _mockDoctorService.Setup(service => service.Getdoctor()).Returns(new List<Doctor>());

            // Add a role to the user
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, "User") }));
            _doctorController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = _doctorController.Get();

            // Assert
            Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
        }

        // Test GetDoctorByName method
        [Test]
        public void GetDoctorByName_ShouldReturnOk_WhenDoctorExists()
        {
            // Arrange
            var doctorName = "Dr. Smith";
            var doctor = new Doctor { name = doctorName };

            _mockDoctorService.Setup(service => service.GetDoctorByName(doctorName)).Returns(doctor);

            // Add a role to the user
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, "User") }));
            _doctorController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = _doctorController.GetDoctorByName(doctorName);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = result.Result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.That(okResult.Value, Is.EqualTo(doctor));
        }

        [Test]
        public void GetDoctorByName_ShouldReturnNotFound_WhenDoctorDoesNotExist()
        {
            // Arrange
            var doctorName = "Dr. NonExistent";
            _mockDoctorService.Setup(service => service.GetDoctorByName(doctorName)).Returns((Doctor)null);

            // Add a role to the user
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, "User") }));
            _doctorController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = _doctorController.GetDoctorByName(doctorName);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.NotNull(notFoundResult);
            Assert.That(notFoundResult.Value, Is.EqualTo($"Doctor with name {doctorName} not found."));
        }
    }
}
