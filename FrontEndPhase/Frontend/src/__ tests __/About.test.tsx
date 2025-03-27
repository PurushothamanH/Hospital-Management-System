import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';
import axios from 'axios';

jest.mock('axios');

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

describe('About Component', () => {
  test('renders About page correctly', () => {
    render(
      <MemoryRouter>
        <About onLogout={jest.fn()} userRole="user" />
      </MemoryRouter>
    );

    expect(screen.getByText(/About Pipallo/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText(/What Our Patients Say/i)).toBeInTheDocument();
  });

  test('renders service cards', () => {
    render(
      <MemoryRouter>
        <About onLogout={jest.fn()} userRole="user" />
      </MemoryRouter>
    );

    expect(screen.getByText(/General Medicine/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology/i)).toBeInTheDocument();
    expect(screen.getByText(/Orthopedics/i)).toBeInTheDocument();
  });

  test('handles profile modal visibility', async () => {
    Storage.prototype.getItem = jest.fn(() => 'mockToken');
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: { username: 'JohnDoe', email: 'john@example.com', contact: 1234567890, dob: '01-01-1990' }
    });

    render(
      <MemoryRouter>
        <About onLogout={jest.fn()} userRole="user" />
      </MemoryRouter>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const profileButton = screen.getByAltText('user');
    fireEvent.click(profileButton);
    fireEvent.click(screen.getByText(/Profile/i));

    await waitFor(() => expect(screen.getByText(/User Profile/i)).toBeInTheDocument());
    expect(screen.getByText(/JohnDoe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/Close/i));
    await waitFor(() => expect(screen.queryByText(/User Profile/i)).not.toBeInTheDocument());
  });

  test('handles logout functionality', async () => {
    const mockLogout = jest.fn();
    render(
      <MemoryRouter>
        <About onLogout={mockLogout} userRole="user" />
      </MemoryRouter>
    );

    Storage.prototype.getItem = jest.fn(() => 'mockToken');

    const profileButton = screen.getByAltText('user');
    fireEvent.click(profileButton);
    fireEvent.click(screen.getByText(/Logout/i));

    await waitFor(() => expect(mockLogout).toHaveBeenCalled());
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('token');
  });
});
