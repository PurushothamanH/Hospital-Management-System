using System.Diagnostics.CodeAnalysis;
using BackendAuth.Models;
using MongoDB.Driver;

namespace BackendAuth.Repos
{
    [ExcludeFromCodeCoverage]
    public class Reportsrepos : Ireportsrepos
    {
        public IMongoCollection<Reportmodel> _collectreport;
        public Reportsrepos()
        {
            var client = new MongoClient("mongodb://localhost:27017/");
            var database = client.GetDatabase("Project");
            _collectreport = database.GetCollection<Reportmodel>("Reports");
        }
        public async Task Addrepos(Reportmodel report)
        {
            await _collectreport.InsertOneAsync(report);
        }

        public async Task<IEnumerable<Reportmodel>> GetReportsByUserIdAsync(int userid)
        {
            var filter = Builders<Reportmodel>.Filter.Eq(r => r.userid, userid);
            return await _collectreport.Find(filter).ToListAsync();
        }
    }
}
