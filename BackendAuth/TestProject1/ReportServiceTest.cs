using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAuth.Models;
using BackendAuth.Repos;
using BackendAuth.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace BackendAuth.Tests
{
    [TestFixture]
    public class ReportserviceTest
    {
        private Mock<Ireportsrepos> _mockRepo;
        private Reportservice _reportService;

        [SetUp]
        public void Setup()
        {
            _mockRepo = new Mock<Ireportsrepos>();
            _reportService = new Reportservice(_mockRepo.Object);
        }

        [Test]
        public async Task AddReport_ShouldReturnOkResult_WhenReportIsAddedSuccessfully()
        {
            // Arrange
            var report = new Reportmodel { DoctorId = 1, userid = 123, Reason= "Sample Report" };
            _mockRepo.Setup(repo => repo.Addrepos(report));

            // Act
            var result = await _reportService.AddReport(report);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task AddReport_ShouldReturnBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            var report = new Reportmodel { DoctorId = 1, userid = 123, Reason = "Sample Report" };
            _mockRepo.Setup(repo => repo.Addrepos(report)).Throws(new Exception("Database error"));

            // Act
            var result = await _reportService.AddReport(report);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task GetReportsByUserIdAsync_ShouldReturnReportsList()
        {
            // Arrange
            var reports = new List<Reportmodel>
            {
                new Reportmodel { DoctorId = 1, userid = 123, Reason = "Report 1" },
                new Reportmodel { DoctorId = 2, userid = 123, Reason = "Report 2" }
            };
            _mockRepo.Setup(repo => repo.GetReportsByUserIdAsync(123)).ReturnsAsync(reports);

            // Act
            var result = await _reportService.GetReportsByUserIdAsync(123);

            // Assert
            Assert.AreEqual(2, result.Count());
            Assert.AreEqual("Report 1", result.First().Reason);
        }
    }
}
