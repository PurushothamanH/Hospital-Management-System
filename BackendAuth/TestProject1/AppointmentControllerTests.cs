using BackendAuth.Controllers;
using BackendAuth.Models;
using BackendAuth.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject1
{
    [TestFixture]
    public class AppointmentControllerTests
    {
        private Mock<Iappointmentservice> _mockAppointmentService;
        private AppointmentController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockAppointmentService = new Mock<Iappointmentservice>();
            _controller = new AppointmentController(_mockAppointmentService.Object);
        }


        [Test]
        public async Task Addappointment_ShouldReturnBadRequest_WhenExceptionOccurs()
        {
            // Arrange
            var appoint = new Appoint { /* Set appropriate properties */ };
            _mockAppointmentService.Setup(service => service.Addappointment(appoint))
                                   .ThrowsAsync(new Exception("Some error"));

            // Act
            var result = await _controller.Addappointment(appoint);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.AreEqual("An error occurred: Some error", badRequestResult.Value);
        }

        [Test]
        public async Task GetAllAppointments_ShouldReturnOkResult_WhenAppointmentsExist()
        {
            // Arrange
            var appointments = new List<Appoint>
            {
                new Appoint { /* Set appropriate properties */ },
                new Appoint { /* Set appropriate properties */ }
            };
            _mockAppointmentService.Setup(service => service.GetAllAppointmentsAsync())
                                   .ReturnsAsync(appointments);

            // Act
            var result = await _controller.GetAllAppointments();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(appointments, okResult.Value);
        }

        [Test]
        public async Task GetAllAppointments_ShouldReturnNotFound_WhenNoAppointmentsExist()
        {
            // Arrange
            _mockAppointmentService.Setup(service => service.GetAllAppointmentsAsync())
                                   .ReturnsAsync(new List<Appoint>());

            // Act
            var result = await _controller.GetAllAppointments();

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
            var notFoundResult = result as NotFoundObjectResult;
            Assert.AreEqual("No appointments found.", notFoundResult.Value);
        }

        [Test]
        public async Task GetAllAppointments_ShouldReturnInternalServerError_WhenExceptionOccurs()
        {
            // Arrange
            _mockAppointmentService.Setup(service => service.GetAllAppointmentsAsync())
                                   .ThrowsAsync(new Exception("Some error"));

            // Act
            var result = await _controller.GetAllAppointments();

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(500, objectResult.StatusCode);
            Assert.AreEqual("Internal server error: Some error", objectResult.Value);
        }
    }
}
