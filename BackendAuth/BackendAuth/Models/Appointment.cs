using System.Diagnostics.CodeAnalysis;
using MongoDB.Bson;

namespace BackendAuth.Models
{
    [ExcludeFromCodeCoverage]
    public class Appointment
    {
        public int userid { get; set; }
        public ObjectId id { get; set; }
        //public int DoctorId { get; set; }
        public string Patientname { get; set; }
        public string Doctorname { get; set; }
        public string speciality { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Reason { get; set; }
    }
}
