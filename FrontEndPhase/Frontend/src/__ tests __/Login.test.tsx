
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "../components/Login";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.spyOn(localStorage.__proto__, "setItem");
  localStorage.clear();
  jest.clearAllMocks();
});

test("handles successful login and navigates to dashboard", async () => {
  const mockToken = "test-token";
  (axios.post as jest.Mock).mockResolvedValueOnce({ data: { token: mockToken } });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => console.log("localStorage value:", localStorage.getItem("token")));

  await waitFor(() => {
    expect(localStorage.setItem).toHaveBeenCalledWith("token", mockToken);
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });  
});
