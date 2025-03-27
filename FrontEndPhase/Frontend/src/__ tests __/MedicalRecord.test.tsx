import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MedicalRecordsComponent from "../components/MedicalRecords"; // Adjust the path if needed
import MedicalRecords from "../Styles/MedicalRecords"; // Mock the MedicalRecords class
import "@testing-library/jest-dom";

jest.mock("../Styles/MedicalRecords");

describe("MedicalRecordsComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders medical records correctly", async () => {
    const mockRecords = [
      { doctorname: "Dr. Smith", patientname: "John Doe", reason: "Flu", prescription: "Rest & Fluids" },
      { doctorname: "Dr. Adams", patientname: "Jane Doe", reason: "Headache", prescription: "Painkillers" },
    ];

    (MedicalRecords.prototype.fetchMedicalRecords as jest.Mock).mockResolvedValueOnce(undefined);
    (MedicalRecords.prototype.getMedicalRecords as jest.Mock).mockReturnValue(mockRecords);

    render(<MedicalRecordsComponent />);

    await waitFor(() => {
      expect(screen.getByText(/medical records/i)).toBeInTheDocument();
      expect(screen.getByText(/Dr\. Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/Dr\. Adams/i)).toBeInTheDocument();
      expect(screen.getByText(/flu/i)).toBeInTheDocument();
      expect(screen.getByText(/painkillers/i)).toBeInTheDocument();
    });
  });

  test("displays 'No records available' when no records exist", async () => {
    (MedicalRecords.prototype.fetchMedicalRecords as jest.Mock).mockResolvedValueOnce(undefined);
    (MedicalRecords.prototype.getMedicalRecords as jest.Mock).mockReturnValue([]);

    render(<MedicalRecordsComponent />);

    await waitFor(() => {
      expect(screen.getByText(/no records available/i)).toBeInTheDocument();
    });
  });
  
  test("handles API failure gracefully", async () => {
    (MedicalRecords.prototype.fetchMedicalRecords as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
  
    render(<MedicalRecordsComponent />);
  
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch records/i)).toBeInTheDocument(); // Check for error message
    });
  });
  

//   test("handles API failure gracefully", async () => {
//     (MedicalRecords.prototype.fetchMedicalRecords as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

//     render(<MedicalRecordsComponent />);

//     await waitFor(() => {
//       expect(screen.getByText(/no records available/i)).toBeInTheDocument();
//     });
//   });
});
