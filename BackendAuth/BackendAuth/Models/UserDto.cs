using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;

namespace BackendAuth.Models
{
    [ExcludeFromCodeCoverage]
    public class UserDto
    {   
        //public int userid { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public long contact {  get; set; }
        public string dob { get; set; }
        public string password { get; set; }

        //public byte[] passwordhash { get; set; }
        //public byte[] passwordsalt { get; set; }

    }
}
