using System.Diagnostics.CodeAnalysis;
using MongoDB.Bson;

namespace JwtWebApiTutorial
{
    [ExcludeFromCodeCoverage]
    public class User
    {
        public ObjectId id { get; set; }
        public string username { get; set; } = string.Empty;
        public int userid { get; set; }
        public byte[] passwordhash { get; set; }
        public byte[] passwordsalt { get; set; }
        public string role { get; set; } = "user";
        public string email { get; set; }
        public long contact { get; set; }
        public string dob { get; set; }
        public string password { get; set; }

        //public string RefreshToken { get; set; } = string.Empty;
        //public DateTime TokenCreated { get; set; }
        //public DateTime TokenExpires { get; set; }
    }
}