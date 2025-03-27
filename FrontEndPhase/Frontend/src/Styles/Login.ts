
import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  border: 2px solid rgba(255, 255, 255, .5);
  padding: 20px;
  position: relative;
  left:600px;
  // background-color:rgb(255, 255, 255);
  border-radius: 8px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LoginHeading = styled.h2`
  text-align: center;
  // font-family: var(--body-font);
  font-family:Menlo;
  color: #black;
  // font-size: var(--h1-font-size);
  font-size:30px;
  margin-bottom: 1.25rem;
`;

export const Form = styled.form`
  display: flex;
  font-family:Menlo;
  flex-direction: column;
  position: relative;
  margin-inline: 1.5rem;
  background-color: hsla(0, 0%, 100%, .01);
  // border: 2px solid hsla(0, 0%, 100%, .7);
  padding: 2.5rem 1rem;
  color: var(--white-color);
  border-radius: none;
  backdrop-filter: blur(16px);
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Registertext = styled.p`
   color : black;
   padding-left:50px;
   font-family: var(--body-font);

`;
export const SubmitButton = styled.button`
  padding: 10px;
  background-color:rgb(52, 52, 53);
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  // font-size: 16px;
  font-size: var(--normal-font-size);
  // font-family: var(--body-font);
  font-family:Menlo;

  &:hover {
    background-color:rgb(34, 47, 43);
  }
`;
