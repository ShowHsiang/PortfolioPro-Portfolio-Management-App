const initialState = {
    isAuthenticated: !!localStorage.getItem('access_token'),
    error: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, isAuthenticated: true, error: '' };
      case 'LOGIN_FAIL':
        return { ...state, error: action.payload };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false, error: '' };
      case 'CLEAR_ERROR':
        return { ...state, error: '' };
      default:
        return state;
    }
  };
  
  export default authReducer;