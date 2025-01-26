// src/components/RegisterModal.js
import React, { useState } from 'react';
import { Dialog, TextField, Button, Typography, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';

const RegisterModal = ({ onSuccess, onSwitch }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8000/api/users/register/', formData);
      setSuccess(true);
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.username || error.response?.data?.email || 'Registration failed');
    }
  };

  return (
    <Dialog open fullWidth maxWidth="sm">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" align="center">Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
        <Button onClick={onSwitch}>Already have an account? Login</Button>

        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Registration successful!
          </Alert>
        </Snackbar>
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
};

export default RegisterModal;
