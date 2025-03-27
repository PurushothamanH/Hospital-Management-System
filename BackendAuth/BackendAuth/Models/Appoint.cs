using System.Diagnostics.CodeAnalysis;

namespace BackendAuth.Models
{
    [ExcludeFromCodeCoverage]
    public class Appoint
    {
        public string Patientname { get; set; } 
        public string Doctorname { get; set; }
        public string speciality { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Reason { get; set; }
    }
}
