import React from 'react';
import styles from '../styles/Homepage.module.css';

const WelcomeSection = ({ username }) => (
  <div className={styles.welcomeSection}>
    <div className={styles.textContainer}>
      <h1 className={styles.welcomeText}>
        <span className={styles.welcomeBackText}>Welcome Back, {username}</span>
        <img
          className={styles.wavingHandEmoji}
          loading="lazy"
          alt="wave emoji"
          src="/waving-hand-emoji@2x.png"
        />
      </h1>
      <p className={styles.happeningText}>
        Here’s what’s happening with your portfolio today.
      </p>
    </div>

    <div className={styles.profileDetails}>
      <img
        className={styles.profileImage}
        alt="profile"
        src="/user_logo.png"
      />
      <div className={styles.profileText}>
        <p className={styles.username}>{username}</p>
        <div className={styles.roleSelect}>
          <select className={styles.roleDropdown}>
            <option value="admin">Admin</option>
            <option value="developer">Web Developer</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeSection;
