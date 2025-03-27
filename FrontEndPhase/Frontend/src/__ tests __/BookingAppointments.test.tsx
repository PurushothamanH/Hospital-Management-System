import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import BookingAppointments from "../components/BookingAppointments";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock jwt-decode
jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(() => ({
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "user",
  })),
}));

describe("BookingAppointments Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "test-token");
  });

  it("renders the booking form", () => {
    render(
      <MemoryRouter>
        <BookingAppointments />
      </MemoryRouter>
    );

    expect(screen.getByText(/Book an Appointment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Doctor Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Speciality/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Appointment Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Patient Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reason/i)).toBeInTheDocument();
  });

  it("fetches and displays user profile", async () => {
    const mockUserData = {
      username: "JohnDoe",
      email: "johndoe@example.com",
      contact: 1234567890,
      dob: "1990-01-01",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <MemoryRouter>
        <BookingAppointments />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith("https://localhost:7003/api/User/Profile", {
        headers: { Authorization: "Bearer test-token" },
      });
    });
  });

  it("submits the booking form successfully", async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <BookingAppointments />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Doctor Name/i), { target: { value: "Dr. Smith" } });
    fireEvent.change(screen.getByLabelText(/Speciality/i), { target: { value: "Cardiology" } });
    fireEvent.change(screen.getByLabelText(/Appointment Date/i), { target: { value: "2025-02-16T10:00" } });
    fireEvent.change(screen.getByLabelText(/Patient Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Reason/i), { target: { value: "Routine Checkup" } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:7003/api/Appointment/addappointment",
        {
          doctorname: "Dr. Smith",
          speciality: "Cardiology",
          appointmentDate: new Date("2025-02-16T10:00").toISOString(),
          patientname: "John Doe",
          reason: "Routine Checkup",
        },
        { headers: { Authorization: "Bearer test-token" } }
      );
    });
  });

  it("shows an error message if appointment booking fails", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Failed to book appointment"));

    render(
      <MemoryRouter>
        <BookingAppointments />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Doctor Name/i), { target: { value: "Dr. Smith" } });
    fireEvent.change(screen.getByLabelText(/Speciality/i), { target: { value: "Cardiology" } });
    fireEvent.change(screen.getByLabelText(/Appointment Date/i), { target: { value: "2025-02-16T10:00" } });
    fireEvent.change(screen.getByLabelText(/Patient Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Reason/i), { target: { value: "Routine Checkup" } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Error booking appointment. Please try again later./i)).toBeInTheDocument();
    });
  });

  it("logs out when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <BookingAppointments />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    
    expect(localStorage.getItem("token")).toBeNull();
  });

});
