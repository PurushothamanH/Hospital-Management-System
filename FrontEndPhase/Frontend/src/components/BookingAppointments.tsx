

import styled from 'styled-components';
import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import outpatient from "../assets/outpatient.png"; 
import logo from "../assets/logo.jpg";
import user from "../assets/user.png";
import {
  Container,
  Heading,
  Label,
  Input,
  Textarea,
  SubmitButton
} from '../Styles/BookingAppointmentsStyles';

import {
  NavbarContainer,
  NavbarItem,
  NavbarLogo,
  NavbarText,
  NavbarButton
} from '../Styles/Navbar'; 


const ProfileButton = styled.div`
  position: relative;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: darkred;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 150px;
  z-index: 10;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const BookingAppointments: React.FC = () => {
  const [doctorname, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<{ username: string; email: string; contact: number; dob: string } | null>(null);
  const [patientname, setPatientName] = useState('');
  const [reason, setReason] = useState('');
  const [role, setRole] = useState<'user' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const formattedDate = new Date(appointmentDate).toISOString();

      const response = await axios.post(
        'http://localhost:7003/api/Appointment/addappointment', 
        {
          doctorname,
          speciality,
          appointmentDate: formattedDate,
          patientname,
          reason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('Error booking appointment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode<{ [key: string]: any }>(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(userRole);
        const response = await axios.get(`https://localhost:7003/api/User/Profile`, {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      });
      setUserData(response.data);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      {/* Navbar */}
      <NavbarContainer>
        <NavbarItem>
          <Link to="/about">
            <NavbarLogo>
              <img src={logo} alt='logo' />
            </NavbarLogo>
          </Link>
          <NavbarText>PIPALLO</NavbarText>
        </NavbarItem>
        <NavbarItem>
          <NavbarButton onClick={() => navigate("/")}>Home</NavbarButton>
          <NavbarButton onClick={() => navigate("/about")}>About</NavbarButton>

          <ProfileButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={user} alt="user" style={{ width: 40, height: 40, borderRadius: 20 }} />
            {dropdownOpen && (
              <DropdownMenu>
                <DropdownItem onClick={() => setShowProfile(true)}>Profile</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            )}
          </ProfileButton>
        </NavbarItem>
      </NavbarContainer>

      {showProfile && userData && (
        <ModalOverlay onClick={() => setShowProfile(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Contact:</strong> {userData.contact}</p>
            <p><strong>Date of Birth:</strong> {userData.dob}</p>
            <CloseButton onClick={() => setShowProfile(false)}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <Container>
        <div>
          <img src={outpatient} alt='appointment' />
        </div>
        <div>
          <Heading style={{ color: "#007C9D" }}>Book an Appointment</Heading>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Doctor Name</Label>
            <Input
              type="text"
              value={doctorname}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Speciality</Label>
            <Input
              type="text"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Appointment Date</Label>
            <Input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Patient Name</Label>
            <Input
              type="text"
              value={patientname}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Reason</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Booking...' : 'Submit'}
          </SubmitButton>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    </>
  );
};

export default BookingAppointments;
