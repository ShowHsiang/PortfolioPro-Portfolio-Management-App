import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction, getPortfolio } from '../redux/actions/portfolioActions';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [tradeData, setTradeData] = useState({
    trade_date: new Date().toISOString().split('T')[0],
    symbol: 'APPL',
    amount: 10,
    price: 10,
    action: 'BUY',
  });

  const handleTradeDataChange = (e) => {
    setTradeData({
      ...tradeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTransaction = () => {
    dispatch(createTransaction(tradeData)); // Dispatch action to add transaction
    setTradeData({ trade_date: '', symbol: '', amount: 0, price: 0, action: 'BUY' }); // Reset form
    dispatch(getPortfolio()); // Refresh portfolio data
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      <FormControl variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Action</InputLabel>
        <Select
          name="action"
          value={tradeData.action}
          onChange={handleTradeDataChange}
          label="Action"
        >
          <MenuItem value="BUY">Buy</MenuItem>
          <MenuItem value="SELL">Sell</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Trade Date"
        type="date"
        name="trade_date"
        variant="outlined"
        value={tradeData.trade_date}
        onChange={handleTradeDataChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Symbol"
        name="symbol"
        variant="outlined"
        value={tradeData.symbol}
        onChange={handleTradeDataChange}
      />
      <TextField
        label="amount"
        type="number"
        name="amount"
        variant="outlined"
        value={tradeData.amount}
        onChange={handleTradeDataChange}
      />
      <TextField
        label="Price"
        type="number"
        name="price"
        variant="outlined"
        value={tradeData.price}
        onChange={handleTradeDataChange}
      />
      <Button variant="contained" color="primary" onClick={handleAddTransaction}>
        Add Transaction
      </Button>
    </Box>
  );
};

export default TransactionForm;