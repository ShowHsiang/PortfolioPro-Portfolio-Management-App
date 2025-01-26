import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import portfolioReducer from './reducers/portfolioReducer';
import authReducer from './reducers/authReducer';
import marketReducer from './reducers/marketReducer';
// combine reducers
const rootReducer = combineReducers({
    portfolio: portfolioReducer, // add portfolio reducer
    auth: authReducer, // add auth reducer
    market: marketReducer, // add market reducer
    // add more reducers
});

// create redux store, apply thunk middleware
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;