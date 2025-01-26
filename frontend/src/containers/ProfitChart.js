import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const ProfitChart = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('1M');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [symbols, setSymbols] = useState([]);

  const fetchProfitHistory = async () => {
    const token = localStorage.getItem('accessToken');
    const baseURL = process.env.REACT_APP_API_URL;
    const params = {
      start_date: getStartDate(timeRange),
      end_date: getEndDate(),
      symbol: selectedSymbol || undefined,
    };
    console.log('params', params);
    try {
      const response = await axios.get(`${baseURL}/portfolio/profit-history/`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching profit history:', error.response?.data || error.message);
    }
  };

  const fetchSymbols = async () => {
    const token = localStorage.getItem('accessToken');
    const baseURL = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${baseURL}/portfolios/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const holdings = response.data[0]?.holdings || [];
      setSymbols(holdings.map((holding) => holding.symbol));
    } catch (error) {
      console.error('Error fetching symbols:', error.response?.data || error.message);
    }
  };

  const getStartDate = (range) => {
    const today = new Date();
    switch (range) {
      case '1W':
        return new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
      case '1M':
        return new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];
      case '1Y':
        return new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0];
      default:
        return '';
    }
  };
  const getEndDate = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - 3)).toISOString().split('T')[0];;
  };

  useEffect(() => {
    fetchSymbols();
    fetchProfitHistory();
  }, [timeRange, selectedSymbol]);

  return (
    <div>
      <h2>Profit Chart</h2>
      <FormControl style={{ marginRight: '1rem', minWidth: 120 }}>
        <InputLabel>Time Range</InputLabel>
        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <MenuItem value="1W">Last Week</MenuItem>
          <MenuItem value="1M">Last Month</MenuItem>
          <MenuItem value="1Y">Last Year</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ marginRight: '1rem', minWidth: 120 }}>
        <InputLabel>Asset</InputLabel>
        <Select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
          <MenuItem value="">All Assets</MenuItem>
          {symbols.map((symbol) => (
            <MenuItem key={symbol} value={symbol}>
              {symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={fetchProfitHistory}>
        Refresh
      </Button>

      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="profit" stroke="#8884d8" />
        <Line type="monotone" dataKey="total_value" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default ProfitChart;
