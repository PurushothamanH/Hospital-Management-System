import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import DoctorList from "../components/Doctor"; // Adjust the import path as needed
import "@testing-library/jest-dom";

jest.mock("axios"); // Mock axios

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate, // Mock useNavigate
}));

describe("DoctorList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders doctor list correctly", async () => {
    const mockDoctors = [
      { docid: 1, name: "Dr. Alice", speciality: "Cardiologist", experience: 10 },
      { docid: 2, name: "Dr. Bob", speciality: "Neurologist", experience: 8 },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockDoctors });

    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    expect(screen.getByText(/Doctor List/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Dr. Alice")).toBeInTheDocument();
      expect(screen.getByText("Dr. Bob")).toBeInTheDocument();
    });

    expect(screen.getByText("Cardiologist")).toBeInTheDocument();
    expect(screen.getByText("Neurologist")).toBeInTheDocument();
  });

  test("handles API error", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch doctor data")).toBeInTheDocument();
    });
  });

  test("navigates to login if not logged in", async () => {
    const mockDoctors = [{ docid: 1, name: "Dr. Alice", speciality: "Cardiologist", experience: 10 }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockDoctors });

    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Dr. Alice")).toBeInTheDocument();
    });

    const appointmentButton = screen.getByRole("button", { name: /Request Appointment/i });
    fireEvent.click(appointmentButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login", {
      state: { doctorName: "Dr. Alice", doctorSpec: "Cardiologist" },
    });
  });

  test("navigates to booking page if logged in", async () => {
    localStorage.setItem("token", "fake-jwt-token");

    const mockDoctors = [{ docid: 1, name: "Dr. Alice", speciality: "Cardiologist", experience: 10 }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockDoctors });

    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Dr. Alice")).toBeInTheDocument();
    });

    const appointmentButton = screen.getByRole("button", { name: /Request Appointment/i });
    fireEvent.click(appointmentButton);

    expect(mockNavigate).toHaveBeenCalledWith("/bookingappointments", {
      state: { doctorName: "Dr. Alice", doctorSpec: "Cardiologist" },
    });
  });

  test("renders login and register buttons when not logged in", () => {
    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  test("does not render login/register buttons when logged in", () => {
    localStorage.setItem("token", "fake-jwt-token");

    render(
      <BrowserRouter>
        <DoctorList />
      </BrowserRouter>
    );

    expect(screen.queryByRole("button", { name: /Login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Register/i })).not.toBeInTheDocument();
  });
});
