// NewsPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import NewsFeed from '../components/NewsFeed';
import NaviBar from '../components/NaviBar';
import styles from './Desktop2.module.css';

const NewsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <NaviBar className={styles.navibar} />
      <NewsFeed className={styles.newsfeed} />
    </div>
  );
};

export default NewsPage;
