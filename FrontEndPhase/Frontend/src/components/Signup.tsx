
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupContainer, SignupHeading, Form,Input, ErrorMessage, SubmitButton } from '../Styles/Signup';
import styled from 'styled-components';
import regist from '../assets/regist.jpg';

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh; /* Full viewport height */
  background-image: url(${regist}); /* This is your imported image */
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

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    const userData = {
      username: username,
      email: email,
      contact: contact,
      dob: dob,
      password: password
    };

    
    try {
      await axios.post('https://localhost:7003/api/User/signup', userData);
      alert('User signed up successfully!');
      navigate('/login');
    } catch (error) {
      setError('Error signing up user');
      console.error('Signup Error:', error);
    }
  };

  return (
    <>
    <LoginWrapper>
      <SignupContainer>
        <SignupHeading>Sign Up</SignupHeading>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder='Contact'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              name='dob'
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
      </SignupContainer>
      </LoginWrapper>

      <ImageContainer>
      </ImageContainer>
    </>

    );
};

export default Signup;