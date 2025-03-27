

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LoginContainer, 
  LoginHeading, 
  Form, 
  Input, 
  ErrorMessage, 
  SubmitButton, 
  Registertext
} from '../Styles/Login'; 
import stets from '../assets/stets.jpg'
import { jwtDecode } from 'jwt-decode';

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh; /* Full viewport height */
  // height:auto;
  background-image: url(${stets}); /* This is your imported image */
  background-size: 100% 100%;
  background-size: cover;  /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  overflow: hidden; /* Prevents content overflow if the image is too large */
`;


const LoginWrapper = styled.div`
  position: absolute;
  top: 20%; /* Adjust this to move the form up or down */
  width: 100%;
  right:270px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Ensure the form is on top of the image */
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:7003/api/User/login', {
        username: username,
        password: password
      });

      if (response && response.data && response.data.token) {
        alert('Logged in successfully');
        localStorage.setItem('token', response.data.token);
        const decodedToken = jwtDecode(response.data.token) as { [key: string]: any };
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if(role === "admin") navigate('/admin-dashboard');
        else navigate('/dashboard');
      } else {
        setError('Login failed. No token received');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginWrapper>
      <LoginContainer>
        <LoginHeading>Login</LoginHeading>
        <Form onSubmit={handleSubmit}>
          <div style={{borderRadius: '50%'}}>
            <Input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{borderRadius: '100px'}}>
            <Input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit" disabled={loading}>Login</SubmitButton>
          {loading && <p>Loading...</p>}
        </Form>
        <Registertext>
          Don't have an account?<a href="/register" style={{ color: 'blue', textDecoration:'none'}}> Register</a>
        </Registertext>
      </LoginContainer>
      </LoginWrapper>
      <ImageContainer>
      </ImageContainer>
    </>
  );
};

export default Login;
