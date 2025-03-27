using BackendAuth.Models;
using BackendAuth.Repos;

namespace BackendAuth.Services
{
    public class Doctorservice : Idoctorservice
    {
        private readonly Idoctorrepos _docrepos;
        public Doctorservice(Idoctorrepos doctorrepos)
        {
            _docrepos = doctorrepos;
        }
        public void Adddoctor(Doctor doc)
        {
            _docrepos.Adddoctor(doc);
        }

        public List<Doctor> Getdoctor()
        {
            return _docrepos.Getdoctor();
        }

        public Doctor GetDoctorByName(string doctorName)
        {
            return _docrepos.GetDoctorByName(doctorName);
        }
    }
}
