using JwtWebApiTutorial;
using MongoDB.Driver;

using BackendAuth.Models;
using System.Diagnostics.CodeAnalysis;
namespace BackendAuth.Repos
{
    [ExcludeFromCodeCoverage]
    public class Doctorrepos : Idoctorrepos
    {
        public IMongoCollection<Doctor> _collectdoc;
        public Doctorrepos()
        {
            var client = new MongoClient("mongodb://localhost:27017/");
            var database = client.GetDatabase("Project");
            _collectdoc = database.GetCollection<Doctor>("Doctordetails");
        }

        public void Adddoctor(Doctor doc)
        {
            _collectdoc.InsertOne(doc);
        }

        public List<Doctor> Getdoctor()
        {
            return _collectdoc.Find(p => true).ToList();
        }
        public Doctor GetDoctorByName(string doctorName)
        {
            return _collectdoc.Find(d => d.name.ToLower() == doctorName.ToLower()).FirstOrDefault();
        }
    }
}
