import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWatchlist,
  fetchAssetData,
} from '../redux/actions/marketActions';
import { DataGrid } from '@mui/x-data-grid';
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
  const { watchlist, selectedMarket } = useSelector((state) => state.market);
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

  const columns = [
    { field: 'symbol', headerName: 'Asset', width: 125 },
    {
      field: 'price',
      headerName: 'Price',
      width: 125,
      renderCell: (params) => `$${params.value || '-'}`,
    },
    {
      field: 'change_24h',
      headerName: '24h Change',
      width: 125,
      renderCell: (params) => (
        <span style={{ color: params.value >= 0 ? 'green' : 'red' }}>
          {params.value ? `${params.value.toFixed(2)}%` : '-'}
        </span>
      ),
    },
    {
      field: 'volume',
      headerName: 'Volume',
      width: 125,
      renderCell: (params) => `$${formatNumber(params.value || 0)}`,
    },
    {
      field: 'market_cap',
      headerName: 'Market Cap',
      width: 125,
      renderCell: (params) => `$${formatNumber(params.value || 0)}`,
    },
  ];

  return (
    <div>
      <h2>Watchlist</h2>
      <DataGrid
        rows={watchlist}
        columns={columns}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        components={{
          Toolbar: () => null,
        }}
      />
    </div>
  );
};

export default Watchlist;