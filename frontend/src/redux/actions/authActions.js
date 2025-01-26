import axios from 'axios';
import { getPortfolio } from './portfolioActions';

console.log('API_BASE_URL:', process.env.REACT_APP_API_URL);
export const login = (formData, navigate) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/token/`,formData, {
      headers: { 'Content-Type': 'application/json'}
    });
    console.log('Login response:', res.data);

    const { access, refresh } = res.data;

    if (access && refresh) {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('username', formData.username);
        console.log('Tokens stored in localStorage.');
        dispatch({ type: 'LOGIN_SUCCESS' });
        navigate('/');
        // dispatch(getPortfolio());  
      } else {
        console.error('No access or refresh token in response:', res.data);
      }
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    dispatch({ type: 'LOGIN_FAIL' });
  }
};
