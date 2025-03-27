import styled from 'styled-components';
import Home from '../assets/Home.jpg';
export const HomeContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background: linear-gradient(rgba(255,255,255,.5), rgba(255, 255, 255, 0.5)), url(${Home});
  background-size: cover;
  @media screen and (min-width: 1200px) {
  width: 100vw;
  height: 100vh;
}
`;

export const Header = styled.header`
  width: fit-content;
  height: fit-content;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  algin-items: flex-start;
  position:relative;
`;


export const StyledImage = styled.img`
    width: 29%; /* Adjust width as needed */
    height: 60%; /* Maintain aspect ratio */
    margin-right:100px;
    margin-bottom:350px;
    border-radius: 8px; /* Optional rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
    object-fit: cover; /* Ensure the image fills its container */
    border-radius: 10px; /* Optional: Add some rounded corners to the image */
`;


export const StyledImagee = styled.img`
  width: 40%;  /* Adjust the image width as needed */
  object-fit: cover;  /* Ensures the image covers the container */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: auto;
  max-width: 100%;  /* Ensure image scales properly */
`;

export const Title = styled.h1`
  font-size: 2.5rem; /* Increase the size for better visibility */
  font-weight: bold;
  text-align:left;
  color: #333; /* Dark color for good contrast */
  text-align: center; /* Center align the title */
  margin-top: 80px; /* Ensure it's placed below the navbar */
  // padding: 10px 0; /* Add padding for spacing around the title */
  // background-color: #fff; /* Optional: background color to make it stand out */
`;


export const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const NavListItem = styled.li`
  display: inline-block;
  margin: 0 15px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

export const Subparagraph = styled.p`
  font-size: 1.2rem; /* Set a font size for the paragraph */
  color: #777; /* Set a slightly lighter color */
  margin-top: 10px; /* Add space between the previous heading */
  width: 40%; /* Control the width of the paragraph */
`;


export const NavbarButt = styled.button`
  background-color: #007bff;  /* Blue background color */
  border-radius:50%;
  color: white;  /* White text color */
  padding: 12px 24px;  /* Adjust padding for button size */
  border: none;  /* Remove border */
  width: max-content;
  position:relative;
  margin-bottom: 200px;  /* Add some space at the top */
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


export const Heading = styled.h2`
  position: relative;
  color: #1e4b63;
  font-size: 2.5rem;
  margin-left: 20px;
  margin-bottom:490px;
  width: 40%; /* Set width to control space for the heading */
`;

export const Headingg = styled.h2`
  color: #1e4b63;
  font-size: 1.8rem;
`;
export const Section = styled.section`
  margin-top: 30px;
`;


export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Vertically center content */
  justify-content: center;
  padding: 20px;
`;
export const Subheading = styled.p`
  font-size: 3.4rem; /* Adjust font size for the paragraph */
  color: #; /black* Set a slightly lighter color for the subheading text */
  /* Add some margin to the left */
  display: flex;
  text-align: right;
  margin-right: 130px; 
  margin-top: 200px; /* Add some space above the paragraph */
`;


export const Features = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const FeatureCard = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(170, 45, 45, 0.1);
  width: 25%;
`;

export const Footer = styled.footer`
  margin-right:1000px;
  position:relative;
  bottom:310px;
  font-size: 14px;
  // text-align:center;
  justify-content: center;
  color: #888;
`;

