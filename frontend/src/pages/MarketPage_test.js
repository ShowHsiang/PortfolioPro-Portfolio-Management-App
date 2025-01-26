import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetData, addAsset, setSelectedMarket } from '../redux/actions/marketActions';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MarketPage = () => {
  const dispatch = useDispatch();
  const { selectedMarket, assets } = useSelector((state) => state.market);
  const [newSymbol, setNewSymbol] = useState('');

  const handleMarketChange = (event) => {
    dispatch(setSelectedMarket(event.target.value));
  };

  const handleAddAsset = () => {
    if (newSymbol) {
      dispatch(addAsset({ market: selectedMarket, symbol: newSymbol }));
      dispatch(fetchAssetData(selectedMarket, newSymbol));
      setNewSymbol('');
    }
  };

  const assetData = assets[selectedMarket] || {};
  console.log('assetData', assetData)
  const assetList = Object.keys(assetData);

  return (
    <div>
      <h2>Market Page</h2>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Market</InputLabel>
        <Select value={selectedMarket} onChange={handleMarketChange} label="Market">
          <MenuItem value="stock">Stock</MenuItem>
          <MenuItem value="crypto">Crypto</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Asset Symbol"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newSymbol}
        onChange={(e) => setNewSymbol(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddAsset}>
        Add Asset
      </Button>

      <div>
  <h3>Asset Data</h3>
  {Object.keys(assetData).length > 0 ? (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>High</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{assetData.date || '-'}</TableCell>
            <TableCell>{assetData.price || '-'}</TableCell>
            <TableCell>{assetData.open || '-'}</TableCell>
            <TableCell>{assetData.high || '-'}</TableCell>
            <TableCell>{assetData.low || '-'}</TableCell>
            <TableCell>{assetData.volume || '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <p>No asset data available.</p>
  )}
</div>

    </div>
  );
};

export default MarketPage;