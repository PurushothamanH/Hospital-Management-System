using BackendAuth.Models;

namespace BackendAuth.Services
{
    public interface Idoctorservice
    {
        void Adddoctor(Doctor doc);
        List<Doctor> Getdoctor();
        public Doctor GetDoctorByName(string doctorName);
    }
}
