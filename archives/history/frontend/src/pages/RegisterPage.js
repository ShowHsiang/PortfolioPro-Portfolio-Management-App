// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  // State variables to store username and password entered by the user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission for user registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      // Sending a POST request to the backend API for user registration
      const { data } = await axios.post('/api/auth/register', { username, password });
      
      // If registration is successful, store the received token in localStorage
      localStorage.setItem('token', data.token);
      alert('Registration successful!');
    } catch (error) {
      // Log error details and display a message to the user if registration fails
      console.error(error);
      alert('Registration failed!');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {/* Submit button for registration */}
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {/* Link to the login page if the user already has an account */}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: { textAlign: 'center', marginTop: '2rem' },
  form: { display: 'inline-block', textAlign: 'left' },
  input: { display: 'block', margin: '0.5rem 0', padding: '0.5rem', width: '200px' },
  button: { padding: '0.5rem', width: '100%' }
};

export default RegisterPage;