
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import user from "../assets/user.png";

const AboutContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 50px;
`;

import {
  NavbarContainer,
  NavbarItem,
  NavbarLogo,
  NavbarText,
  NavbarList,
  NavbarButton
} from '../Styles/Navbar';

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  top:20px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #1e4b63;
`;

const Subheading = styled.h2`
  font-size: 1.5rem;
  color: #444;
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

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
  color:black;
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
const ServiceCard = styled.div`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: #1e4b63;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const FeedbackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const FeedbackCard = styled.div`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const FeedbackText = styled.p`
  font-size: 1rem;
  color: #555;
  font-style: italic;
  margin-bottom: 10px;
`;

const FeedbackAuthor = styled.h4`
  font-size: 1.1rem;
  color: #1e4b63;
  margin-top: 10px;
`;

type NavbarProps = {
  userRole: 'user' | 'admin' | null;
  onLogout: () => void;
};

const About: React.FC<NavbarProps>=({onLogout}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
  const navigate = useNavigate(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<{ username: string; email: string; contact: number; dob: string } | null>(null);
  

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token from storage
    setIsLoggedIn(false);  // Update state
    setRole(null);  // Reset role
    navigate('/');
  };
  

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        const decodedToken = jwtDecode(token) as { [key: string]: any };
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(userRole);
        
        try {
          const response = await axios.get(`https://localhost:7003/api/User/Profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log("User Data Response:", response.data);  // Debugging log
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchToken();
  }, []);
  
  

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
                        <NavbarButton onClick={() => navigate("/login")}>Login</NavbarButton>
                      </NavbarItem>
                      <NavbarItem>
                        <NavbarButton onClick={() => navigate("/register")}>Register</NavbarButton>
                      </NavbarItem>
                      <NavbarItem>
                      <NavbarButton onClick={()=>{navigate("/")}}>Home</NavbarButton>
                      </NavbarItem>
                      <NavbarItem>
                        <NavbarButton onClick={() => navigate("/doctor-list")}>View Doctors</NavbarButton>
                      </NavbarItem>
                    </>
                  )}
                </NavbarList>
        
                  {isLoggedIn && role === 'user' && (
                    <>
                    <NavbarList style={{marginRight:40}}>
                      <NavbarItem>
                        <NavbarButton onClick={() => navigate("/")}>Home</NavbarButton>
                      </NavbarItem>
                      <NavbarItem>
                        <NavbarButton onClick={() => navigate("/doctor-list")}>View Doctors</NavbarButton>
                      </NavbarItem>
                      <ProfileButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={user} alt="user" style={{ width: 40, height: 40, borderRadius: 20 }} />
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => {setShowProfile(true);}}>
                    Profile
                    </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              )}
            </ProfileButton>
            </NavbarList>

            {showProfile && userData && ( 
          <ModalOverlay onClick={() => setShowProfile(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>User Profile</h2>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Contact:</strong> {userData.contact}</p>
              <p><strong>Date of Birth:</strong> {userData.dob}</p>
              <CloseButton onClick={() =>setShowProfile(false)}>Close</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
         </>
             )}

             {isLoggedIn && role === 'admin' && (
                    <>
                    <NavbarList style={{marginRight:40}}>
                      <NavbarItem>
                        <NavbarButton onClick={() => navigate("/")}>Home</NavbarButton>
                      </NavbarItem>
                      <NavbarItem>
                        <NavbarButton onClick={() => navigate("/doctor-list")}>View Doctors</NavbarButton>
                      </NavbarItem>
                      <ProfileButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={user} alt="user" style={{ width: 40, height: 40, borderRadius: 20 }} />
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => {setShowProfile(true)
                  }}>Profile</DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              )}
            </ProfileButton>
            </NavbarList>

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
        </>
             )}

            {/* need to write logic for user and admin navbar for about page */}
                
        </NavbarContainer>

      <AboutContainer>
        <Header>
          <Heading>About Pipallo</Heading>
        </Header>
        <Section>
          <Subheading>Our Mission</Subheading>
          <Paragraph>
            Our mission is to provide high-quality healthcare services with compassion,
            care, and respect for each patient.
          </Paragraph>
        </Section>
        <Section>
          <Subheading>Our Services</Subheading>
          <Paragraph>We offer a wide range of healthcare services, including:</Paragraph>

          <ServicesContainer>
            <ServiceCard>
              <ServiceTitle>General Medicine</ServiceTitle>
              <ServiceDescription>
                Comprehensive care for common illnesses.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard>
              <ServiceTitle>Cardiology</ServiceTitle>
              <ServiceDescription>
                Specialized care for heart health.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard>
              <ServiceTitle>Orthopedics</ServiceTitle>
              <ServiceDescription>
                Expert care for bones, joints, and muscles.
              </ServiceDescription>
            </ServiceCard>
          </ServicesContainer>
        </Section>
        <Section>
          <Subheading>Contact Us</Subheading>
          <Paragraph>
            If you have any questions, please contact us:
          </Paragraph>
          <ul>
            <li>Phone: +91 1234567890</li>
            <li>Email: pipallo@hospital.com</li>
            <li>Address: Pipallo Hospital Street, Kandanchavadi, Chennai</li>
          </ul>
        </Section>
        <Section>
          <Subheading>What Our Patients Say</Subheading>
          <FeedbackContainer>
            <FeedbackCard>
              <FeedbackText>
                "The care I received from the doctors and staff was exceptional."
              </FeedbackText>
              <FeedbackAuthor>- John D.</FeedbackAuthor>
            </FeedbackCard>

            <FeedbackCard>
              <FeedbackText>
                "I had a great experience at this hospital."
              </FeedbackText>
              <FeedbackAuthor>- Jane S.</FeedbackAuthor>
            </FeedbackCard>
          </FeedbackContainer>
        </Section>
      </AboutContainer>
    </>
  );
};

export default About;
