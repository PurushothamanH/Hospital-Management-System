
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  // background-color:rgb(51, 167, 181);
  background-color: #007C9D;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between; /* Space out the logo and other items */
  align-items: center; /* Align vertically in the center */
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;



export const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  // align-items: right;
  justify-content : center;
  // border : 2px black solid;
`;



export const NavbarItem = styled.div`
  display: flex;
  align-items: center; /* Vertically center the navbar items (buttons) */
  justify-content: flex-end; /* Align items to the right */
  gap: 8px; /* Optional: Add some space between items */
  margin-right:40px;
  cursor: pointer;
`;

export const NavbarButton = styled.button`
  background: white;
  color: black;
  border-radius:20px;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  margin-right:5px;
  margin-left: auto;
  &:hover {
    background-color:rgb(51, 167, 181);
  }
`;


export const NavbarText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px; /* Add spacing between the logo and the text */
  color:rgb(17, 18, 19); /* Optional, change color */
  display: inline-block; /* Ensure text stays next to the logo */
  align-self: center; /* Center text vertically with the logo */
`;

export const LogoutButton = styled.button`
  background-color: #dc3545; /* Red color for logout */
  color: white;
  border: none;
  border-radius:100%;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  left:200px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333; /* Darker red on hover */
  }
`;



export const NavbarLogo = styled.div`
  display: flex;
  align-items: center; /* Vertically center the logo */
  justify-content: flex-start; /* Align the logo to the left */
  
  img {
    
    border-radius: 50%;
    height: 50px; /* Set a fixed height for the logo */
    width: auto;  /* Ensure the aspect ratio of the logo is maintained */
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color:rgb(242, 163, 163);
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 100%;
  // opacity:0;
  display: block;


  // ${NavbarItem}:hover & {
  //   display: block;
  // }

  & button {
    background: none;
    border: none;
    color:rgb(206, 224, 232);
    text-align: left;
    padding: 12px 16px;
    display: block;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;
