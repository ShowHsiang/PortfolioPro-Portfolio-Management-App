import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Link } from '@mui/material';

const NewsCard = ({ article }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      {article.urlToImage && (
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={article.urlToImage}
          alt={article.title}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography component="h6" variant="h6">
            <Link href={article.url} target="_blank" rel="noopener" underline="hover">
              {article.title}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {article.description || "No description available."}
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
            Source: {article.source.name} - {new Date(article.publishedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default NewsCard;