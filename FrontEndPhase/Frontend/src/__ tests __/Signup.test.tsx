import React from "react";
import Signup from "../components/Signup";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";

import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

describe("signup component", () => {

  test("should render", () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    // screen.debug();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Sign Up");
  });

  test("renders form fields", () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contact")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  test("displays error message when passwords do not match", () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password456" },
    });

    
    const submitButton = screen.getAllByRole("button")[0];
    fireEvent.submit(submitButton);
  
    const paragraph = screen.getByRole("paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Passwords don't match");
  });

  test("displays error message when email format is invalid", () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });

    const submitButton = screen.getAllByRole("button")[0];
    fireEvent.submit(submitButton);

    const errorMessage = screen.getByText("Invalid email format");
    expect(errorMessage).toBeInTheDocument();
  });

  test("navigates to login page on successful signup", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({ data: {} });

    window.alert = jest.fn();

    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contact"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    const submitButton = screen.getAllByRole("button")[0];
    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(window.alert).toHaveBeenCalledWith("User signed up successfully!");
  });

  test("display error message on API call failure", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockRejectedValue(new Error("API call failed"));

    console.error = jest.fn();

    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contact"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    const submitButton = screen.getAllByRole("button")[0];
    await act(async () => {
      fireEvent.submit(submitButton);
    });

    const errorMessage = screen.getByText("Error signing up user");
    expect(errorMessage).toBeInTheDocument();
  });
});
 