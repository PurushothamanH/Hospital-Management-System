using System.Diagnostics.CodeAnalysis;
using BackendAuth.Models;
using MongoDB.Driver;

namespace BackendAuth.Repos
{
    [ExcludeFromCodeCoverage]
    public class Appointmentrepos : Iappointmentrepos
    {
        public IMongoCollection<Appointment> _appoint;
        public Appointmentrepos()
        {
            var client = new MongoClient("mongodb://localhost:27017/");
            var database = client.GetDatabase("Project");
            _appoint = database.GetCollection<Appointment>("Appointment");
        }


        // get the appointment details by doctor name and speciality
        // appointment is being done by providing the patient name, doctor name, doctor speciality, appointment date...
        public async Task<Appointment> GetAppointmentByDoctorAndDateAsync(string doctorname, string speciality, DateTime AppointmentDate)
        {
            //var appointmentDateUtc = appointmentDate.ToUniversalTime();
            return await _appoint
                .Find(a => a.Doctorname == doctorname && a.speciality == speciality && a.AppointmentDate==AppointmentDate)
                .FirstOrDefaultAsync();
        }

        public async Task AddappointmentAsync(Appointment appoin)
        {
            await _appoint.InsertOneAsync(appoin);
        }
        public async Task<List<Appointment>> GetAllAppointmentsAsync()
        {
            return await _appoint.Find(_ => true).ToListAsync(); // Fetches all appointments
        }
    }
}
