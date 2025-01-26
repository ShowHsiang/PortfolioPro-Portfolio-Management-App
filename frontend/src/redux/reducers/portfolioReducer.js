import { GET_PORTFOLIO } from '../actions/portfolioActions';

const initialState = {
    portfolios: [],
};

export default function portfolioReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PORTFOLIO':
            console.log('GET_PORTFOLIO:', action.payload);
            return { ...state, loading: true, error: null };
        case 'GET_PORTFOLIO_SUCCESS':
            console.log('GET_PORTFOLIO_SUCCESS:', action.payload);
            return { ...state, loading: false, portfolios: action.payload, error: null };
        case 'GET_PORTFOLIO_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}