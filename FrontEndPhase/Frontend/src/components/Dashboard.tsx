
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import doctorlogo from "../assets/doctorlogo.png";
import bookappt_icon from "../assets/bookappt_icon.svg";
import Viewrecord from "../assets/View Health Record.svg";
import past from "../assets/past.svg";
import doc from "../assets/finddoc.svg";
import upcoming from"../assets/appointmentimage.svg";
import DataFetching from '../Styles/Upcomingappointments';
import { HighlightedText, GreetingText,RenderCard } from '../Styles/Dashboard';

const Container = styled.div`
  padding: 20px;
  // max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  top:140px;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
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
    background-color:#007C9D;
  }
`;


const CardContent = styled.div`
  font-size: 14px;
  justify-content: center;
  color: #333;
`;

const CardTitle = styled.h5`
  font-size: 18px;
  font-weight: 800;
  fontFamily:"sans-serif"
  color:rgb(24, 25, 26);
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  position: relative;
  top:150px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Dashboard: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [currentSection, setCurrentSection] = useState<'upcoming' | 'past' | 'reports' | null>(null);
    const [dashboardData, setDashboardData] = useState<any>({
      upcomingAppointments: [],
      pastAppointments: [],
      reports: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                setUsername(name);
            } catch (error) {
                console.error('Error decoding token', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataFetchingInstance = new DataFetching();
            await dataFetchingInstance.fetchDashboardData();
            setDashboardData(dataFetchingInstance.getDashboardData());
            setLoading(false);
        };
        fetchData();
    }, []);

    const formatDate = (date: string) => {
        const appointmentDate = new Date(date);
        return appointmentDate.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const renderAppointments = (appointments: any[]) => {
        return appointments.length > 0 ? (
            <CardContainer>
                {appointments.map((appointment, index) => (
                    <RenderCard key={index}>
                      <img src={doctorlogo} alt="doctorimg" />
                        <CardTitle>{appointment.doctorname || 'No Doctor Name Available'}</CardTitle>
                        <CardContent>
                            <strong>Patient:</strong> {appointment.patientname} <br />
                            <strong>Appointment Date:</strong> {formatDate(appointment.appointmentDate)} <br />
                            <strong>Reason:</strong> {appointment.reason}
                        </CardContent>
                    </RenderCard>
                ))}
            </CardContainer>
        ) : (
            <p>No appointments found</p>
        );
    };

    const renderReports = (reports: any[]) => {
        return reports.length > 0 ? (
            <CardContainer>
                {reports.map((report, index) => (
                    <Card key={index}>
                        <CardTitle>{report.doctorname}</CardTitle>
                        <CardContent>
                            <strong>Patient:</strong> {report.patientname} <br />
                            <strong>Reason:</strong> {report.reason} <br />
                            <strong>Prescription:</strong> {report.prescription}
                        </CardContent>
                    </Card>
                ))}
            </CardContainer>
        ) : (
            <p>No reports available.</p>
        );
    };

    return (
        <Container>
            <Heading>Dashboard</Heading>
            <Navbar loggedIn={true} userRole="user" onLogout={() => localStorage.clear()} />
            {currentSection === null && username && (
              <GreetingText>Hello, <HighlightedText>{username}</HighlightedText></GreetingText>
            )}
            {currentSection === null && (
            <div style={{ marginTop: '80px' }}>
                <h3 style={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                    What Would You Like To Do Today?
                </h3>
            </div>
        )}
            {currentSection === null ? (
                <CardContainer>
                    <Card onClick={() => setCurrentSection('upcoming')}>
                    <img src={bookappt_icon} alt="Book Appointment" />
                        <CardTitle>Upcoming Appointments</CardTitle>
                    </Card>
                    <Card onClick={() => setCurrentSection('past')}>
                    <img src={past} alt="Past Appointments" />
                        <CardTitle>Past Appointments</CardTitle>
                    </Card>
                    <Card onClick={() => setCurrentSection('reports')}>
                    <img src={Viewrecord} alt="View Health Record" />
                        <CardTitle>Medical Records</CardTitle>
                    </Card>
                    <Card onClick={() => navigate('/doctor-list')}>
                    <img src={doc} alt="View Doctors" />
                        <CardTitle>View Doctors</CardTitle>
                    </Card>
                    <Card onClick={() => navigate('/bookingappointments')}>
                    <img src={upcoming} alt="Book Appointment" />
                        <CardTitle>Book Appointments</CardTitle>
                    </Card>
                </CardContainer>
            ) : (
                <>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {currentSection === 'upcoming' && renderAppointments(dashboardData.upcomingAppointments)}
                            {currentSection === 'past' && renderAppointments(dashboardData.pastAppointments)}
                            {currentSection === 'reports' && renderReports(dashboardData.reports)}
                        </>
                    )}
                    <BackButton onClick={() => setCurrentSection(null)}>Back</BackButton>
                </>
            )}
        </Container>
    );
};

export default Dashboard;
