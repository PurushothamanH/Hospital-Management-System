using BackendAuth.Models;
using JwtWebApiTutorial;

namespace BackendAuth.Repos
{
    public interface Idoctorrepos
    {
        public void Adddoctor(Doctor doc);
        public List<Doctor> Getdoctor();
        public Doctor GetDoctorByName(string doctorName);
    }

}
