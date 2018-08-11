import axios from 'axios';
import {
    FETCH_TOP_TEN_REQUEST,
    FETCH_TOP_TEN_SUCCESS,
    FETCH_TOP_TEN_FAILED,
    FETCH_COIN_HISTORY_REQUEST,
    FETCH_COIN_HISTORY_SUCCESS,
    FETCH_COIN_HISTORY_FAILED,
    RECEIVE_TICKERS,
    RECEIVE_COIN_DATA,
    RECEIVE_MARKET_OVERVIEW_DATA,
    RECEIVE_COIN_HISTORY_DATA
} from './actionTypes';


import {favouritesRef} from '../firebase.js';

export const addFavourite = (coin, uid) => {
    console.log(coin, uid);
    return dispatch => {
        favouritesRef.child(uid).push().set(coin);
    }
}


export const receiveMarketOverviewData = json => {
    return {
        type: RECEIVE_MARKET_OVERVIEW_DATA,
        payload: json
    };
};

export const receiveCoinHistoryData = json => {
    return {
        type: RECEIVE_COIN_HISTORY_DATA,
        payload: json
    };
};

export const receiveCoinData = json => {
    return {
        type: RECEIVE_COIN_DATA,
        payload: json
    };
};

export const receiveTickers = json => {
    return {
        type: RECEIVE_TICKERS,
        payload: json
    };
};

// Documentation https://coinmarketcap.com/api/#endpoint_listings
export function fetchTickers() {
    return dispatch => {
        return axios
            .get(`https://api.coinmarketcap.com/v2/listings/`)
            .then(response => {
                dispatch(receiveTickers(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export const fetchTopTen = () => dispatch => {

    dispatch({
        type: FETCH_TOP_TEN_REQUEST,
        isFetching: true
    });


    const request = axios({
        method: 'GET',
        url: 'https://api.coinmarketcap.com/v2/ticker/?limit=10',
        header: []
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_TOP_TEN_SUCCESS,
                payload: response.data,
                isFetching: false
            }),
        error =>
            dispatch({
                type: FETCH_TOP_TEN_FAILED,
                payload: error || 'Failed to fetch top ten',
                isFetching: false
            })
    );
};

// Documentation  https://min-api.cryptocompare.com/
export const fetchCoinHistory = (ticker) => dispatch => {

    dispatch({
        type: FETCH_COIN_HISTORY_REQUEST,
        isFetching: true
    });

    const request = axios({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`,
        header: []
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_COIN_HISTORY_SUCCESS,
                payload: response.data,
                isFetching: false
            }),
        error =>
            dispatch({
                type: FETCH_COIN_HISTORY_FAILED,
                payload: error.response.data || 'Failed to fetch coin history',
                isFetching: false
            })
    )
};

// Documentation https://api.coinmarketcap.com/v2/ticker/?limit=10
export function fetchCoinData() {
    return dispatch => {
        return axios
            .get(`https://api.coinmarketcap.com/v2/ticker/`)
            .then(response => {
                dispatch(receiveCoinData(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function fetchMarketOverviewData(currency = '') {
    return dispatch => {
        return axios
            .get(`https://api.coinmarketcap.com/v2/global/`)
            .then(response => {
                dispatch(receiveMarketOverviewData(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}
