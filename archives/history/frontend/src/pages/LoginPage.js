// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  // State variables to store username and password entered by the user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission for user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      // Sending a POST request to the backend API for login
      const { data } = await axios.post('/api/auth/login', { username, password });
      
      // If login is successful, store the received token in localStorage
      localStorage.setItem('token', data.token);
      alert('Login successful!');
    } catch (error) {
      // Log error details and display a message to the user if login fails
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
        {/* Submit button for login */}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {/* Link to the registration page if the user doesn't have an account */}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
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

export default LoginPage;