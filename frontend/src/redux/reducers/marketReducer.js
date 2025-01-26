// src/redux/reducers/marketReducer.js
import {
    FETCH_ASSET_DATA, ADD_ASSET, SET_SELECTED_MARKET, ADD_ASSET_TO_WATCHLIST,
    REMOVE_ASSET_FROM_WATCHLIST,
} from '../actions/marketActions';

import {
    FETCH_WATCHLIST,
    ADD_WATCHLIST_ITEM,
    REMOVE_WATCHLIST_ITEM,
    WATCHLIST_ERROR,
} from '../actions/marketActions';

const initialState = {
    selectedMarket: 'stock',
    assets: {},
    watchlist: [],
    error: null,
};


const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_MARKET:
            return { ...state, selectedMarket: action.payload };
        // case ADD_ASSET:
        //     const { market, symbol } = action.payload;
        //     return {
        //         ...state,
        //         assets: {
        //             ...state.assets,
        //             [market]: [...(state.assets[market] || []), symbol],
        //         },
        //     };
        case ADD_ASSET_TO_WATCHLIST:
            const { symbol } = action.payload;
            if (!state.watchlist.some(asset => asset.symbol === symbol)) {
                return {
                    ...state,
                    watchlist: [...state.watchlist, { symbol }],
                    error: null,
                };
            }
        case REMOVE_ASSET_FROM_WATCHLIST:
            return {
                ...state,
                watchlist: state.watchlist.filter((asset) => asset.symbol !== action.payload),
            };
        case FETCH_ASSET_DATA:
            const { data, market: fetchedMarket } = action.payload;
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [fetchedMarket]: {
                        ...state.assets[fetchedMarket],
                        ...data,
                    },
                },
                watchlist: state.watchlist.map((asset) =>
                    asset.symbol === data.symbol ? { ...asset, ...data } : asset
                ),
            };

        case FETCH_WATCHLIST:
            return {
                ...state,
                watchlist: action.payload,
                error: null,
            };
        case ADD_WATCHLIST_ITEM:
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload],
                error: null,
            };
        case REMOVE_WATCHLIST_ITEM:
            return {
                ...state,
                watchlist: state.watchlist.filter((item) => item.id !== action.payload),
                error: null,
            };
        case WATCHLIST_ERROR:
            return {
                ...state,
                error: action.payload,
            };



        default:
            return state;
    }
};

export default marketReducer;
