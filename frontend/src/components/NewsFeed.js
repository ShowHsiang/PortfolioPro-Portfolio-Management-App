// NewsFeed.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('business');

  const categories = ['business', 'technology', 'entertainment', 'health', 'science', 'sports'];

  const fetchNews = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category,
          country: 'us',
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
        },
      });
      const filteredNews = response.data.articles.filter((article) => !article.title.includes('[Removed]'));
      setNews(filteredNews);
    } catch (error) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return (
    <Box className={styles.newsfeedContainer}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Top Headlines - {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>

      {/* Category Selector */}
      <FormControl variant="outlined" className={styles.selectBox}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* News Display */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" sx={{ color: 'red' }}>
          {error}
        </Typography>
      ) : (
        news.map((article, index) => (
          <div key={index} className={styles.newsItem}>
            <NewsCard article={article} />
          </div>
        ))
      )}
    </Box>
  );
};

export default NewsFeed;
