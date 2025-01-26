import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NaviBar from '../components/NaviBar';
import WelcomeSection from '../containers/WelcomeSection';
import QuickOverview from '../containers/QuickOverview';
import TopAssets from '../containers/TopAssets';
import Login from '../components/LoginModal';
import Register from '../components/RegisterModal';
import Watchlist from '../containers/Watchlist_display';
import ChatWithXAI from '../components/ChatWithXAI';
import styles from '../styles/Homepage.module.css';

const Homepage = () => {
  const [time, setTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    window.location.reload();
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.naviBar}>
        <NaviBar />
      </div>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <WelcomeSection username={localStorage.getItem('username')} />
          <div className={styles.row}>
            <div className={styles.leftColumn}>
              <QuickOverview />
              <Watchlist />
            </div>
            <div className={styles.rightColumn}>
              <TopAssets />
              <ChatWithXAI className={styles.chatAssistant} />
            </div>
          </div>
        </div>
      </main>
      {showLogin && (
        <Login
          onSuccess={handleLoginSuccess}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <Register
          onSuccess={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Homepage;
