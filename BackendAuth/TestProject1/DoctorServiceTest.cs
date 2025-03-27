using System.Collections.Generic;
using BackendAuth.Models;
using BackendAuth.Repos;
using BackendAuth.Services;
using Moq;
using NUnit.Framework;

namespace BackendAuth.Tests
{
    [TestFixture]
    public class DoctorserviceTest
    {
        private Mock<Idoctorrepos> _mockRepo;
        private Doctorservice _doctorService;

        [SetUp]
        public void Setup()
        {
            _mockRepo = new Mock<Idoctorrepos>();
            _doctorService = new Doctorservice(_mockRepo.Object);
        }

        [Test]
        public void Adddoctor_ShouldCallRepoAddDoctor()
        {
            // Arrange
            var doctor = new Doctor { name = "Dr. John Doe" };

            // Act
            _doctorService.Adddoctor(doctor);

            // Assert
            _mockRepo.Verify(repo => repo.Adddoctor(doctor), Times.Once);
        }

        [Test]
        public void Getdoctor_ShouldReturnListOfDoctors()
        {
            // Arrange
            var doctors = new List<Doctor>
            {
                new Doctor { name = "Dr. John Doe" },
                new Doctor { name = "Dr. Jane Smith" }
            };
            _mockRepo.Setup(repo => repo.Getdoctor()).Returns(doctors);

            // Act
            var result = _doctorService.Getdoctor();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Dr. John Doe", result[0].name);
            Assert.AreEqual("Dr. Jane Smith", result[1].name);
        }

        [Test]
        public void GetDoctorByName_ShouldReturnCorrectDoctor()
        {
            // Arrange
            var doctor = new Doctor { name = "Dr. John Doe" };
            _mockRepo.Setup(repo => repo.GetDoctorByName("Dr. John Doe")).Returns(doctor);

            // Act
            var result = _doctorService.GetDoctorByName("Dr. John Doe");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Dr. John Doe", result.name);
        }
    }
}
