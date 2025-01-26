import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CurrencyConverter from '../components/CurrencyConverter';
import HoldingList from '../components/HoldingList';

const Homepage = () => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4">Welcome, {username}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Current time: {time.toLocaleTimeString()}
      </Typography>

      {/* Currency Converter Component */}
      <CurrencyConverter />
      <HoldingList />
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 4 }}>
        Log out
      </Button>
    </Container>
  );
};

export default Homepage;