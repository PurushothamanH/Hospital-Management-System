
import styled from 'styled-components';

export const SignupContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  position:relative;
  left:630px;
  bottom:50px;
  // background:transparent;
  background-color:rgb(253, 253, 253);
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, .5);
`;

export const SignupHeading = styled.h2`
  text-align: center;
  color: #333;
`;

export const Form = styled.form`
  backgorund-color:hsla(0, 0%, 100%, .01);
  display: flex;
  flex-direction: column;
  // filter: blur(16px);
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  margin-left:20px;
  border: 2px solid rgba(255, 255, 255, .5);
  border-radius: 4px;
  margin-bottom: 15px;
  width:220px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  margin-left:80px;
  padding-left: 10px;
  background-color:rgb(19, 49, 218);
  color: white;
  width: 40%;
  border-radius: 30px;
  justify-content: right;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color:rgb(36, 22, 226);
  }
`;