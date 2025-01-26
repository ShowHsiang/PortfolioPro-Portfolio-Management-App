// src/components/LoginModal.js
import React, { useState } from 'react';
import { Dialog, TextField, Button, Typography, Snackbar, Alert, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';

const LoginModal = ({ onSuccess, onSwitch }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, onSuccess));
  };

  return (
    <Dialog open fullWidth maxWidth="sm">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" align="center">Login</Typography>
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
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
        <Button onClick={onSwitch}>Don't have an account? Register</Button>

        <Snackbar open={Boolean(error)} autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
