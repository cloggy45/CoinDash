import axios from 'axios';
import {
    FETCH_TOP_TEN_REQUEST,
    FETCH_TOP_TEN_SUCCESS,
    FETCH_TOP_TEN_FAILED,
    FETCH_COIN_HISTORY_REQUEST,
    FETCH_COIN_HISTORY_SUCCESS,
    FETCH_COIN_HISTORY_FAILED,
    RECEIVE_COIN_DATA,
    FETCH_COIN_LIST_REQUEST,
    FETCH_COIN_LIST_SUCCESS,
} from './actionTypes';

export const fetchCoinList = () => dispatch => {
    dispatch({
        type: FETCH_COIN_LIST_REQUEST,
        isFetching: true,
    });

    const request = axios({
        method: 'GET',
        url: 'https://min-api.cryptocompare.com/data/all/coinlist',
        header: [],
    });

    return request
        .then(response => {
            dispatch({
                type: FETCH_COIN_LIST_SUCCESS,
                payload: response.data.Data,
                isFetching: false,
            });
        })
        .catch(error => console.log(error));
};

export const fetchTopTen = () => dispatch => {
    dispatch({
        type: FETCH_TOP_TEN_REQUEST,
        isFetching: true,
    });

    const request = axios({
        method: 'GET',
        url: 'https://api.coinmarketcap.com/v2/ticker/?limit=10',
        header: [],
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_TOP_TEN_SUCCESS,
                payload: response.data,
                isFetching: false,
            }),
        error =>
            dispatch({
                type: FETCH_TOP_TEN_FAILED,
                payload: error || 'Failed to fetch top ten',
                isFetching: false,
            })
    );
};

// Documentation  https://min-api.cryptocompare.com/
export const fetchCoinHistory = ticker => dispatch => {
    dispatch({
        type: FETCH_COIN_HISTORY_REQUEST,
        isFetching: true,
    });

    const request = axios({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`,
        header: [],
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_COIN_HISTORY_SUCCESS,
                payload: response.data,
                isFetching: false,
            }),
        error =>
            dispatch({
                type: FETCH_COIN_HISTORY_FAILED,
                payload: error,
                isFetching: false,
            })
    );
};

// Documentation https://api.coinmarketcap.com/v2/ticker/?limit=10
export const fetchCoinData = () => dispatch => {
    const request = axios({
        method: 'GET',
        url: 'https://api.coinmarketcap.com/v2/ticker/',
        header: [],
    });
    return request.then(
        response => {
            dispatch({
                type: RECEIVE_COIN_DATA,
                payload: response.data,
            });
        },
        error => console.log(error)
    );
};
