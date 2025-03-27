using BackendAuth.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace BackendAuth.Repos
{
    [ExcludeFromCodeCoverage]
    public class DashBoardRepos : IDashBoardRepos
    {
        private readonly IMongoCollection<Appointment> _appointmentCollection;
        private readonly IMongoCollection<Reportmodel> _reportCollection;

        public DashBoardRepos(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("Project");
            _appointmentCollection = database.GetCollection<Appointment>("Appointment");
            _reportCollection = database.GetCollection<Reportmodel>("Reports");
        }

        public async Task<List<Appointment>> GetUpcomingAppointments(int userId)
        {
            var filter = Builders<Appointment>.Filter.Eq(a => a.userid, userId) & 
                         Builders<Appointment>.Filter.Gt(a => a.AppointmentDate, DateTime.Now);

            return await _appointmentCollection.Find(filter).ToListAsync();
        }

        public async Task<List<Appointment>> GetPastAppointmentsAsync(int userId)
        {
            var filter = Builders<Appointment>.Filter.Eq(a => a.userid, userId) &  
                         Builders<Appointment>.Filter.Lt(a => a.AppointmentDate, DateTime.Now);

            return await _appointmentCollection.Find(filter).ToListAsync();
        }

        public async Task<List<Reportmodel>> GetReportsByUserId(int userId)
        {
            var filter = Builders<Reportmodel>.Filter.Eq(r => r.userid, userId);  

            return await _reportCollection.Find(filter).ToListAsync();
        }
    }
}
