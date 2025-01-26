import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWatchlist,
  fetchAssetData,
  addWatchlistItem,
  removeWatchlistItem,
  setSelectedMarket,
} from '../redux/actions/marketActions';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColumns,
  GridRowsProp,
  GridRowParams,
} from '@mui/x-data-grid';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const formatNumber = (num) => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  } else {
    return num.toFixed(2);
  }
};

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist, selectedMarket, error } = useSelector((state) => state.market);
  const [newSymbol, setNewSymbol] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  useEffect(() => {
    const updateWatchlist = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await axios.get(`${baseURL}/market/assets/`, {
          params: { symbols: watchlist.map((asset) => asset.symbol).join(',') },
          headers: { Authorization: `Bearer ${token}` },
        });

        const assets = response.data;

        assets.forEach((asset) => {
          const { symbol, market_type } = asset;

          const existingAsset = watchlist.find((item) => item.symbol === symbol);
          if (existingAsset && !existingAsset.price) {
            dispatch(fetchAssetData(market_type, symbol));
          }
        });
      } catch (error) {
        console.error('Error fetching assets from backend:', error.response?.data || error.message);
      }
    };

    updateWatchlist();
  }, [dispatch, watchlist, baseURL]);

  const handleAddAsset = () => {
    const symbol = newSymbol.trim().toUpperCase();
    if (symbol && !watchlist.some((asset) => asset.symbol === symbol)) {
      dispatch(addWatchlistItem(symbol));
      dispatch(fetchAssetData(selectedMarket, symbol));
      setSnackbarMessage(`Asset "${symbol}" added to watchlist.`);
      setNewSymbol('');
    } else if (symbol) {
      setSnackbarMessage(`Asset "${symbol}" is already in the watchlist.`);
    }
  };

  const handleRemoveAsset = (params) => {
    dispatch(removeWatchlistItem(params.id));
    setSnackbarMessage(`Asset "${params.row.symbol}" removed from watchlist.`);
  };

  const handleMarketChange = (event) => {
    dispatch(setSelectedMarket(event.target.value));
  };

  const columns = [
    { field: 'symbol', headerName: 'Asset', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 200,
      renderCell: (params) => `$${params.value || '-'}`,
    },
    {
      field: 'change_24h',
      headerName: '24h Change',
      width: 200,
      renderCell: (params) => (
        <span style={{ color: params.value >= 0 ? 'green' : 'red' }}>
          {params.value ? `${params.value.toFixed(2)}%` : '-'}
        </span>
      ),
    },
    {
      field: 'volume',
      headerName: 'Volume',
      width: 200,
      renderCell: (params) => `$${formatNumber(params.value || 0)}`,
    },
    {
      field: 'market_cap',
      headerName: 'Market Cap',
      width: 200,
      renderCell: (params) => `$${formatNumber(params.value || 0)}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleRemoveAsset(params)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <h2>Watchlist</h2>
      <div style={{ alignItems: 'center' }}>
        <FormControl style={{ width: '200px' }}>
          <InputLabel>Market</InputLabel>
          <Select value={selectedMarket} onChange={handleMarketChange}>
            <MenuItem value="stock">Stock</MenuItem>
            <MenuItem value="crypto">Crypto</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Asset Symbol (e.g. AAPL, TSLA, BTCUSDT, ETHUSDT)"
          variant="outlined"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          style={{ flex: 2, marginLeft: '1rem', width: '500px' }}
        />
        <Button variant="contained" size="large" style={{ marginLeft: '1rem' }} color="primary" onClick={handleAddAsset}>
          Add Asset
        </Button>
      </div>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
      >
        <Alert severity="info" onClose={() => setSnackbarMessage(null)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <DataGrid
        rows={watchlist}
        columns={columns}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        components={{ Toolbar: () => null }}
      />
    </div>
  );
};

export default Watchlist;