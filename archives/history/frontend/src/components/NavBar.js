// frontend/src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  console.log('Rendering NavBar'); // Debug: Log NavBar rendering

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Portfolio</h2>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <Link to="/" style={styles.link}>Dashboard</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/portfolio" style={styles.link}>My Wallet</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/analytics" style={styles.link}>Analytics</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/settings" style={styles.link}>Settings</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/register" style={styles.link}>Register</Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: '#1F1D2B',
    height: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  menuItem: {
    marginBottom: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: '#252A41',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'background-color 0.3s',
  },
};

export default NavBar;
