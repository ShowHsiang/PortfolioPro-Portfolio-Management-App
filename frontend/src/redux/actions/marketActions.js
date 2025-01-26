// src/redux/actions/marketActions.js
import axios from 'axios';

export const FETCH_ASSET_DATA = 'FETCH_ASSET_DATA';
export const ADD_ASSET = 'ADD_ASSET';
export const SET_SELECTED_MARKET = 'SET_SELECTED_MARKET';
export const ADD_ASSET_TO_WATCHLIST = 'ADD_ASSET_TO_WATCHLIST';
export const REMOVE_ASSET_FROM_WATCHLIST = 'REMOVE_ASSET_FROM_WATCHLIST';

export const FETCH_WATCHLIST = 'FETCH_WATCHLIST';
export const ADD_WATCHLIST_ITEM = 'ADD_WATCHLIST_ITEM';
export const REMOVE_WATCHLIST_ITEM = 'REMOVE_WATCHLIST_ITEM';
export const WATCHLIST_ERROR = 'WATCHLIST_ERROR';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchAssetData = (market, symbol) => async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('No access token found, cannot fetch asset data.');
      return;
    }
    console.log('fetching asset data', `${API_BASE_URL}/market/${market}/${symbol}/`);
    const response = await axios.get(`${API_BASE_URL}/market/${market}/${symbol}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('fetch asset data', response);
    dispatch({
      type: FETCH_ASSET_DATA,
      payload: { market, data: response.data },
    });
  } catch (error) {
    if (error.response) {
      // console.error('Failed to fetch asset data:', error.response.status, error.response.data);
    } else {
      console.error('Network error or server not reachable:', error.message);
    }
  }
};

export const addAsset = (market, symbol) => ({
  type: ADD_ASSET,
  payload: { market, symbol },
});

export const setSelectedMarket = (market) => ({
  type: SET_SELECTED_MARKET,
  payload: market,
});

// Watchlist actions
export const addAssetToWatchlist = (market, symbol) => ({
    type: ADD_ASSET_TO_WATCHLIST,
    payload: { market, symbol },
  });
  
  export const removeAssetFromWatchlist = (symbol) => ({
    type: REMOVE_ASSET_FROM_WATCHLIST,
    payload: symbol,
  });
  


  export const fetchWatchlist = () => async (dispatch) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/market/watchlist/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: FETCH_WATCHLIST,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: WATCHLIST_ERROR,
        payload: 'Failed to fetch watchlist.',
      });
    }
  };
  
  export const addWatchlistItem = (symbol) => async (dispatch) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${API_BASE_URL}/market/watchlist/`,
        { symbol },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: ADD_WATCHLIST_ITEM,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: WATCHLIST_ERROR,
        payload: 'Failed to add asset to watchlist.',
      });
    }
  };
  
  export const removeWatchlistItem = (id) => async (dispatch) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${API_BASE_URL}/market/watchlist/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: REMOVE_WATCHLIST_ITEM,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: WATCHLIST_ERROR,
        payload: 'Failed to remove asset from watchlist.',
      });
    }
  };
  