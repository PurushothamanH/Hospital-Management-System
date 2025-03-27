using System.Diagnostics.CodeAnalysis;
using BackendAuth.Repos;
using MongoDB.Bson;

namespace BackendAuth.Models
{
    [ExcludeFromCodeCoverage]
    public class Doctor
    {
        public ObjectId id { get; set; }
        public int docid { get; set; }
        public string name { get; set; }
        public string speciality { get; set; }
        public int experience { get; set; }
    }
}
