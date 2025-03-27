using System.Diagnostics.CodeAnalysis;
using MongoDB.Bson;

namespace BackendAuth.Models
{
    [ExcludeFromCodeCoverage]
    public class Reportmodel
    {
        public ObjectId id { get; set; }
        public int DoctorId { get; set; }
        public int userid { get; set; }
        public string Doctorname { get; set; }
        public string Patientname { get; set; }
        public string Reason { get; set; }
        public string Prescription { get; set; }
    }
}
