import styled from 'styled-components';
const FormSection = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;


import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import doctorlogo from "../assets/doctorlogo.png";
// import report from "../assets/report.png";
import adddoc from "../assets/medical-team.png";
import schedule from "../assets/schedule.png";
import medicalrecord from "../assets/medical-record.png";

const Container = styled.div`
  padding: 20px;
  margin: auto;
  text-align: center;
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 100px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background-color: #007C9D;
  }
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

type DoctorData = {
  docid: string;
  name: string;
  speciality: string;
  experience: string | number;
};

type ReportData = {
  doctorId: string;
  userId: string;
  doctorName: string;
  patientName: string;
  reason: string;
  prescription: string;
};

const AdminDashboard: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'appointments' | 'addDoctor' | 'reports' | null>(null);
  const [appointments, setAppointments] = useState<{ doctorname: string; patientname: string; appointmentDate: string; }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [doctorId, setDoctorId] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState<number | string>('');
  
    const [doctorIdReport, setDoctorIdReport] = useState('');
    const [userId, setUserId] = useState('');
    const [doctorNameReport, setDoctorNameReport] = useState('');
    const [patientName, setPatientName] = useState('');
    const [reason, setReason] = useState('');
    const [prescription, setPrescription] = useState('');
  

  useEffect(() => {
    if (currentSection === 'appointments') {
      fetchAppointments();
    }
  }, [currentSection]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:7003/api/Appointment/getallappointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const doctorData: DoctorData = {
      docid: doctorId,
      name: doctorName,
      speciality: specialty,
      experience,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in to add a doctor');
        return;
      }
      await axios.post('https://localhost:7003/api/Doctor/register', doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Doctor added successfully');
      setDoctorId('');
      setDoctorName('');
      setSpecialty('');
      setExperience('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor.');
    }
  };

    const handleAddReport = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const reportData: ReportData = {
        doctorId: doctorIdReport,
        userId,
        doctorName: doctorNameReport,
        patientName,
        reason,
        prescription,
      };
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to log in to add a report');
          return;
        }
  
        await axios.post('https://localhost:7003/api/Report/addreport', reportData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        alert('Report added successfully');
        setDoctorIdReport('');
        setUserId('');
        setDoctorNameReport('');
        setPatientName('');
        setReason('');
        setPrescription('');
      } catch (error) {
        console.error('Error adding report:', error);
        alert('Failed to add report.');
      }
    };



  return (
    <Container>
      <Heading>Admin Dashboard</Heading>
      <Navbar loggedIn={true} userRole="admin" onLogout={() => localStorage.clear()} />
      {currentSection === null && (
                    <div style={{ marginTop: '80px' }}>
                        <h3 style={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                            What Would You Like To Do Today?
                        </h3>
                    </div>
                )}
      {currentSection === null ? (
        <CardContainer>
          <Card onClick={() => setCurrentSection('appointments')}>
            <img src={schedule} alt="Appointments" />
            <h5>View Appointments</h5>
          </Card>
          <Card onClick={() => setCurrentSection('addDoctor')}>
            <img src={adddoc} alt="Add Doctor" />
            <h5>Add Doctor</h5>
          </Card>
          <Card onClick={() => setCurrentSection('reports')}>
            <img src={medicalrecord} alt="Reports" />
            <h5>View Reports</h5>
          </Card>
        </CardContainer>
      ) : (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {currentSection === 'appointments' && (
                <div style={{ marginTop: '60px' }}>
                  <h3>Appointments</h3>
                  <CardContainer>
                    {appointments.map((appointment, index) => (
                      <Card key={index}>
                        <img src={doctorlogo} alt="Doctor" />
                        <p><strong>Doctor:</strong> {appointment.doctorname}</p>
                        <p><strong>Patient:</strong> {appointment.patientname}</p>
                        <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
                      </Card>
                    ))}
                  </CardContainer>
                </div>
              )}
             {currentSection === 'addDoctor' && (
              <div style={{ marginTop: '60px' }}>
                <FormSection>
                  <h3>Add Doctor</h3>
                  <Form onSubmit={handleAddDoctor}>
                    <Input
                      type="text"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      placeholder="Doctor ID"
                      required
                    />
                    <Input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      placeholder="Doctor Name"
                      required
                    />
                    <Input
                      type="text"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="Specialty"
                      required
                    />
                    <Input
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Experience (Years)"
                      required
                    />
                    <SubmitButton type="submit">Add Doctor</SubmitButton>
                  </Form>
                </FormSection>
                </div>
             )}

              {currentSection === 'reports' && (
                  <FormSection>
                  <div style={{ marginTop: '60px' }}>
                  <h3 style={{justifyContent:"center"}}>Add Report</h3>        
                   </div>
                  <Form onSubmit={handleAddReport}>
                    <Input
                      type="text"
                      value={doctorIdReport}
                      onChange={(e) => setDoctorIdReport(e.target.value)}
                      placeholder="Doctor ID"
                    />
                    <Input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="User ID"
                    />
                    <Input
                      type="text"
                      value={doctorNameReport}
                      onChange={(e) => setDoctorNameReport(e.target.value)}
                      placeholder="Doctor Name"
                    />
                    <Input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Patient Name"
                    />
                    <TextArea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Reason"
                    />
                    <TextArea
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      placeholder="Prescription"
                    />
                    <SubmitButton type="submit">Add Report</SubmitButton>
                  </Form>
                </FormSection>
                )}
          </>
          )}
          <BackButton onClick={() => setCurrentSection(null)}>Back</BackButton>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
