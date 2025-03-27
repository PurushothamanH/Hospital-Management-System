import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import Login from './components/Login';
import Signup from './components/Signup';
import Doctor from './components/Doctor';
import Dashboard from './components/Dashboard';
import About from './components/About';
import BookingAppointments from '../src/components/BookingAppointments';
import MedicalRecords from './components/MedicalRecords';
import AdminDashboard from './components/AdminDashboard';
// import BookingAppointments from '../src/components/BookingAppointments';

function App () {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  const handleLogin = (role: 'user' | 'admin') => {
    setLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn} userRole={userRole} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/doctor-list" element={<Doctor/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookingappointments" element={<BookingAppointments />} />
        <Route path="/medicalrecords" element={<MedicalRecords/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/personal-records" element={<div>User Personal Records</div>} />
        <Route path="/booking-appointments" element={<div>Booking Appointments Page</div>} />
        <Route path="/retrieving-medical-record" element={<div>Retrieving Medical Record Page</div>} />
        <Route path="/appointments-list" element={<div>Appointments List Page</div>} />
        <Route path="/add-doctor" element={<div>Add Doctor Page</div>} />
        <Route path="/add-records" element={<div>Add Records Page</div>} />
      </Routes>
    </Router>
  );
};

export { App };
