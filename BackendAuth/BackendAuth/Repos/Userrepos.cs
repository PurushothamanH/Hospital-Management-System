
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;
using BackendAuth.Models;
using JwtWebApiTutorial;
using System.Diagnostics.CodeAnalysis;

namespace BackendAuth.Repos
{
    [ExcludeFromCodeCoverage]
    public class Userrepos : Iuserrepos
    {
        public IMongoCollection<User> _collect;
        public Userrepos()
        {
            var client = new MongoClient("mongodb://localhost:27017/");
            var database = client.GetDatabase("Project");
            _collect = database.GetCollection<User>("Userdetails");
        }

        public async Task AddUserAsync(User user)
        {
            await _collect.InsertOneAsync(user);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _collect.Find(user => user.username == username).FirstOrDefaultAsync();
        }
        public async Task<UserReturn> Getuserprofile(string username)
        {
            var projection = Builders<User>.Projection
               .Include(u => u.username)
               .Include(u => u.email)
               .Include(u => u.dob)
               .Include(u => u.contact)
               .Exclude("_id");
            return await _collect.Find(u => u.username == username).Project<UserReturn>(projection).FirstOrDefaultAsync();
        }
    }
}