// frontend/src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import NavBar component
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AppRoutes = () => {
  console.log('Rendering AppRoutes'); // Debug: Log AppRoutes rendering

  return (
    <Router>
      <NavBar />
      <div style={{ marginLeft: '240px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;

