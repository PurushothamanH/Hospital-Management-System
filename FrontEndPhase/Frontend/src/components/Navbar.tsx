
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/logo.jpg';
import user from "../assets/user.png";

import { 
  NavbarContainer, 
  NavbarList,
  NavbarItem, 
  LogoutButton,
  NavbarButton,
  NavbarLogo,
  NavbarText
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

type NavbarProps = {
  loggedIn: boolean;
  onLogout: () => void;
  userRole: 'user' | 'admin' | null;
  onSectionChange?: (
    section: "upcoming" | "past" | "reports" | "appointments" | "addDoctor" | "addReport"
  ) => void;
};

const Navbar: React.FC<NavbarProps> = ({ loggedIn, onLogout, onSectionChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<{ username: string; email: string; contact: number; dob: string } | null>(null);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token) as { [key: string]: any };
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

  if (location.pathname === '/') {
    return (
      <NavbarContainer>
        <NavbarItem>
          <Link to="/about">
            <NavbarLogo>
              <img src={logo} alt='logo'/>
            </NavbarLogo>
          </Link>
          <NavbarText>PIPALLO</NavbarText>
        </NavbarItem>
        <NavbarList>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/login") }}>Login</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/register") }}>Register</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/about") }}>About</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/doctor-list") }}>View Doctors</NavbarButton>
          </NavbarItem>
        </NavbarList>
      </NavbarContainer>
    );
  }

  if (loggedIn && role === 'user') {
    return (
      <>
        <NavbarContainer>
          <NavbarItem>
            <Link to="/about">
              <NavbarLogo>
                <img src={logo} alt='logo'/>
              </NavbarLogo>
            </Link>
            <NavbarText>PIPALLO</NavbarText>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/") }}>Home</NavbarButton>
            <NavbarButton onClick={() => { navigate("/about") }}>About</NavbarButton>
            
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
      </>
    );
  }

  if (loggedIn && role === 'admin') {
    return (
      <>
      <NavbarContainer>
        <NavbarList>
          <NavbarItem>
          <Link to="/about">
        <NavbarLogo>
          <img src={logo}alt='logo'/>
        </NavbarLogo>
        </Link>
            <NavbarText>PIPALLO</NavbarText>
          </NavbarItem>
          <NavbarItem style={{marginLeft:"1400px"}}>
          <NavbarButton onClick={() => { navigate("/") }}>Home</NavbarButton>
            <NavbarButton onClick={() => { navigate("/about") }}>About</NavbarButton>
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
        </NavbarList>
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
    </>
 
    );
  }

  if (loggedIn) {
    return (
      <NavbarContainer>
        <NavbarList>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/Home") }}>Home</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </NavbarItem>
        </NavbarList>
      </NavbarContainer>
    );
  }

  if(location.pathname ==="/about"){
    return(
      <>
      <NavbarContainer>
        <NavbarItem>
          <Link to="/about">
            <NavbarLogo>
              <img src={logo} alt='logo'/>
            </NavbarLogo>
          </Link>
          <NavbarText>PIPALLO</NavbarText>
        </NavbarItem>
        <NavbarList>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/login") }}>Login</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/register") }}>Register</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/about") }}>About</NavbarButton>
          </NavbarItem>
          <NavbarItem>
            <NavbarButton onClick={() => { navigate("/doctor-list") }}>View Doctors</NavbarButton>
          </NavbarItem>
        </NavbarList>
      </NavbarContainer>
      </>
    )
  
  }

  return null;
};

export default Navbar;
