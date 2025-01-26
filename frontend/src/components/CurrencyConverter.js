import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const CurrencyConverter = () => {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'SGD', 'HKD']; // Common currencies
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const ratesData = response.data.rates;

      const exchangeRates = {};
      currencies.forEach((currency) => {
        exchangeRates[currency] = {};
        currencies.forEach((targetCurrency) => {
          if (currency === targetCurrency) {
            exchangeRates[currency][targetCurrency] = 1;
          } else {
            exchangeRates[currency][targetCurrency] = ratesData[targetCurrency] / ratesData[currency];
          }
        });
      });

      setRates(exchangeRates);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();

    const intervalId = setInterval(fetchExchangeRates, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const exchangeRate = rates[baseCurrency]?.[targetCurrency];
  const priceChange = null; // This API doesn't provide price change data

  return (
    <Card sx={{ minWidth: 275, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Currency Converter
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 100, mx: 1 }}>
            <InputLabel>From</InputLabel>
            <Select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              label="From"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ minWidth: 100, mx: 1 }}>
            <InputLabel>To</InputLabel>
            <Select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              label="To"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" sx={{ color: 'red' }}>
            {error}
          </Typography>
        ) : exchangeRate !== undefined ? (
          <Box>
            <Typography variant="h6">
              Exchange Rate: {exchangeRate.toFixed(4)}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;