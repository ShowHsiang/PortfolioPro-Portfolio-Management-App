// frontend/src/components/AnalyticsChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const AnalyticsChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Income',
        data: [10000, 20000, 15000, 25000, 30000, 28000, 35000, 40000],
        fill: false,
        borderColor: '#36A2EB',
      },
      {
        label: 'Outcome',
        data: [8000, 18000, 12000, 22000, 28000, 26000, 32000, 38000],
        fill: false,
        borderColor: '#FF6384',
      },
    ],
  };

  return (
    <div style={styles.card}>
      <h2>Analytics</h2>
      <Line data={data} />
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#252A41',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
  },
};

export default AnalyticsChart;