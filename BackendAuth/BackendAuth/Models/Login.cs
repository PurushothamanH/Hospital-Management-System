using System.Diagnostics.CodeAnalysis;

namespace BackendAuth.Models
{
    [ExcludeFromCodeCoverage]
    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
