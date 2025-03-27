import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Heading = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
`;

export const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 20px;
    font-size: 1rem;
`;

export const CardContainer = styled.div`
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 50%;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* Adjust spacing between icons */
  margin-bottom: 20px; /* Space between icons and the rest of the card */
`;

export const Button = styled.button`
  // background-color: #007bff;  /* Blue background color */
  background-color:rgb(240, 119, 5);
  border-radius:50%;
  right: 45px;
  color: white;  /* White text color */
  padding: 12px 24px;  /* Adjust padding for button size */
  border: none;  /* Remove border */
  width: max-content;
  position:relative;
  border-radius: 5px;  /* Rounded corners */
  font-size: 1rem;  /* Font size */
  cursor: pointer;  /* Pointer cursor on hover */
  transition: background-color 0.3s ease, transform 0.2s ease;  /* Smooth transitions for hover effect */

  &:hover {
    background-color:rgb(240, 119, 5);  /* Darker blue on hover */
    transform: scale(1.05);  /* Slightly enlarge on hover */
  }

  &:focus {
    outline: none;  /* Remove outline when focused */
  }

  &:active {
    background-color: #004085;  /* Even darker blue when the button is clicked */
    transform: scale(1);  /* Return to normal size on click */
  }
`;


export const DoctorCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border:1px solidrgb(24, 152, 1);
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow:0px 0px 6px #cadee4;
    border-radius: 8px;
    margin: 10px 0;
`;

export const DoctorInfo = styled.div`
    flex: 1; /* Make the content area take up available space */
    padding-left: 20px; /* Add space between content and image */
    position: relative;
    left: 40px;
    font-size: 1.2rem;
`;

