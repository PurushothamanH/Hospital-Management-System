import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AdminDashboard from "../components/AdminDashboard";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(() => ({ "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "admin" })),
}));

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "test-token");
  });

  it("renders the admin dashboard with options", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/What Would You Like To Do Today/i)).toBeInTheDocument();
    expect(screen.getByText(/View Appointments/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Doctor/i)).toBeInTheDocument();
    expect(screen.getByText(/View Reports/i)).toBeInTheDocument();
  });

  it("navigates to appointments section and fetches appointments", async () => {
    const mockAppointments = [
      { doctorname: "Dr. Smith", patientname: "John Doe", appointmentDate: "2025-02-16T10:00:00Z" },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockAppointments } as any);

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/View Appointments/i));

    // Add console log to check if the axios.get call is being made
    console.log("Fetching appointments...");

    expect(await screen.findByText(/Appointments/i)).toBeInTheDocument();

    await waitFor(() => {
      // Add console log to check if the state is being updated
      console.log("Checking if appointments are displayed...");
      expect(screen.getByText(/Dr. Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  it("handles API error when fetching appointments", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/View Appointments/i));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error fetching appointments:", expect.any(Error));
    });

    expect(screen.queryByText(/Appointments/i)).not.toBeInTheDocument();
  });

  it("navigates to add doctor section and submits the form", async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Add Doctor/i));

    expect(await screen.findByText(/Add Doctor/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Doctor ID"), { target: { value: "D001" } });
    fireEvent.change(screen.getByPlaceholderText("Doctor Name"), { target: { value: "Dr. John" } });
    fireEvent.change(screen.getByPlaceholderText("Specialty"), { target: { value: "Cardiology" } });
    fireEvent.change(screen.getByPlaceholderText("Experience (Years)"), { target: { value: "10" } });

    fireEvent.click(screen.getByText(/Add Doctor/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://localhost:7003/api/Doctor/register",
        { docid: "D001", name: "Dr. John", speciality: "Cardiology", experience: "10" },
        { headers: { Authorization: "Bearer test-token" } }
      );
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Doctor ID")).toHaveValue(""); // Ensure reset
    });
  });

  it("returns to main menu when back button is clicked", async () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/View Appointments/i));
    expect(await screen.findByText(/Appointments/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Back/i));
    expect(screen.getByText(/What Would You Like To Do Today/i)).toBeInTheDocument();
  });
});