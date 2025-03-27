
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../assets/logo.jpg";
import doctorlogo from "../assets/doctorlogo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import {
    NavbarContainer,
    NavbarItem,
    NavbarLogo,
    NavbarText,
    NavbarList,
    NavbarButton
} from '../Styles/Navbar';

import {
    Container,
    Heading,
    ErrorMessage,
    CardContainer,
    DoctorCard,
    DoctorInfo,
    Button
} from '../Styles/Doctor';

interface Doctor {
    docid: number;
    name: string;
    speciality: string;
    experience: number;
}

const DoctorList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://localhost:7003/api/Doctor/Doctorlist');
                setDoctors(response.data);
            } catch (error: any) {
                setError('Failed to fetch doctor data');
                console.error('Error fetching doctors:', error.message || error);
            }
        };

        fetchDoctors();
    }, []);

    const handleAppointmentRequest = (doctorName: string, doctorSpec: string) => {
        const token = localStorage.getItem("token");

        if (token == null) {
            navigate('/login', { state: { doctorName, doctorSpec } });
        } else {
            navigate('/bookingappointments', {
                state: {
                    doctorName,
                    doctorSpec
                }
            });
        }
    };

    return (
        <>
            <NavbarContainer>
                <NavbarItem>
                   <Link to="/about">
                    <NavbarLogo>
                    <img src={logo}alt='logo'/>
                    </NavbarLogo>
                    </Link>
                    <NavbarText>PIPALLO</NavbarText>
                </NavbarItem>
                <NavbarList>
                    {!isLoggedIn && (
                        <>
                         <NavbarItem>
                            <NavbarButton onClick={() => { navigate("/login") }}>Login</NavbarButton>
                        </NavbarItem>
                        <NavbarItem>
                            <NavbarButton onClick={() => { navigate("/register") }}>Register</NavbarButton>
                        </NavbarItem>
                        {/* <NavbarItem>
                            <NavbarButton onClick={() => { navigate("/doctor-list") }}>View Doctors</NavbarButton>
                        </NavbarItem> */}
                        </>
                    )}
                    <NavbarItem>
                        <NavbarButton onClick={() => { navigate("/about") }}>About</NavbarButton>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarButton onClick={()=>{navigate("/home")}}>Home</NavbarButton>
                    </NavbarItem>
                </NavbarList>
            </NavbarContainer>

            {/* Doctor List Content */}
            <Container>
                <Heading>Doctor List</Heading>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                {/* Card Layout for Doctors */}
                <CardContainer>
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.docid}>
                            <img src={doctorlogo} alt={doctor.name} />
                            <DoctorInfo>
                                <h3>{doctor.name}</h3>
                                <p style={{ color: "#007C9D" }}>{doctor.speciality}</p>
                                <p><strong>Experience:</strong> {doctor.experience} years</p>
                            </DoctorInfo>
                            {/* Conditionally render the "Request Appointment" button */}
                            <div>
                                <h2 style={{color: "#007C9D"}}>Mon - Sat</h2>
                                <Button onClick={() => handleAppointmentRequest(doctor.name, doctor.speciality)}>
                                    Request Appointment
                                </Button>
                            </div>
                        </DoctorCard>
                    ))}
                </CardContainer>
            </Container>
        </>
    );
};

export default DoctorList;

