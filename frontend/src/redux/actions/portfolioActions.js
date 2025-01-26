// src/redux/actions/portfolioActions.js
import axios from 'axios';

export const GET_PORTFOLIO = 'GET_PORTFOLIO';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getPortfolio = () => async (dispatch) => {
  dispatch({ type: 'GET_PORTFOLIO' });
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Retrieved access token from localStorage:', token); 

    if (!token) {
      console.warn('No access token found, cannot fetch portfolio.');
      dispatch({ type: 'GET_PORTFOLIO_FAIL', payload: 'No access token found' });
      return;
    }

    console.log('Sending request to fetch portfolio with token in headers...');

    const res = await axios.get(`${API_BASE_URL}/portfolios/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Portfolio data retrieved successfully:', res.data);

    dispatch({
      type: 'GET_PORTFOLIO_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      console.error('Error fetching portfolio:', error.response.status, error.response.data);
    } else {
      console.error('Network error or server not reachable:', error.message);
    }
    dispatch({
      type: 'GET_PORTFOLIO_FAIL',
      payload: 'Failed to fetch portfolio data',
    });
  }
};
// Create Transaction action
export const createTransaction = (tradeData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken');
    await axios.post(
      `${API_BASE_URL}/portfolio/transactions/`,
      tradeData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Transaction created successfully');
    console.log('Refreshing portfolio data...');
    dispatch(getPortfolio()); // Refresh portfolio data after adding transaction
  } catch (error) {
    console.error('Failed to create transaction:', error.response?.data || error.message);
  }
};

// Edit Transaction
export const editTransaction = (transactionId, updatedData) => async (dispatch) => {
  try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${API_BASE_URL}/portfolio/transactions/${transactionId}/`, updatedData, {
          headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(getPortfolio()); // Refresh portfolio data
  } catch (error) {
      console.error('Failed to edit transaction:', error.response?.data || error.message);
  }
};

// Delete Transaction
export const deleteTransaction = (transactionId) => async (dispatch) => {
  try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${API_BASE_URL}/portfolio/transactions/${transactionId}/`, {
          headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(getPortfolio()); // Refresh portfolio data
  } catch (error) {
      console.error('Failed to delete transaction:', error.response?.data || error.message);
  }
};