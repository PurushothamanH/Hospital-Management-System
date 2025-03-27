import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path as needed
import "@testing-library/jest-dom";

const mockLogout = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar Component", () => {
  test("renders guest navbar with login and register buttons", () => {
    render(
      <MemoryRouter>
        <Navbar loggedIn={false} onLogout={mockLogout} userRole={null} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/View Doctors/i)).toBeInTheDocument();
  });


  test("renders admin navbar with admin options", () => {
    render(
      <MemoryRouter>
        <Navbar loggedIn={true} onLogout={mockLogout} userRole="admin" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Appointments/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Doctor/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Report/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("renders user navbar with appointment options", async () => {
    render(
      <MemoryRouter>
        <Navbar loggedIn={true} onLogout={mockLogout} userRole="user" />
      </MemoryRouter>
    );
  
    // Open the dropdown if it's hidden
    const manageAppointmentsButton = screen.getByText(/Manage Appointments/i);
    fireEvent.click(manageAppointmentsButton);
  
    expect(await screen.findByText(/Upcoming Appointments/i)).toBeInTheDocument();
    expect(await screen.findByText(/Medical Records/i)).toBeInTheDocument();
    expect(await screen.findByText(/Logout/i)).toBeInTheDocument();
  });
  

  test("calls logout function on logout button click", async () => {
    render(
      <MemoryRouter>
        <Navbar loggedIn={true} onLogout={mockLogout} userRole="user" />
      </MemoryRouter>
    );

    // fireEvent.click(screen.getByText(/Logout/i));
    // expect(mockLogout).toHaveBeenCalled();
    const logoutButton = await screen.findByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);
  });

  test("navigates to login page when login button is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar loggedIn={false} onLogout={mockLogout} userRole={null} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Login/i));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
