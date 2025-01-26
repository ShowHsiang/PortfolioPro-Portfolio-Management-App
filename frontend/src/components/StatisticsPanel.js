import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticsPanel = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Statistics Panel</Typography>
        <Typography variant="subtitle1">Portfolio Value: ${data.portfolioValue}</Typography>
        <Typography variant="subtitle1" color={data.totalGain >= 0 ? 'primary' : 'secondary'}>
          Total Gain: ${data.totalGain}
        </Typography>
        <Typography variant="subtitle1" color={data.dailyGain >= 0 ? 'primary' : 'secondary'}>
          Daily Gain: ${data.dailyGain}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticsPanel;