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

import baseUrl from '../config';

export const fetchCoinList = () => dispatch => {
    dispatch({
        type: FETCH_COIN_LIST_REQUEST,
        isFetching: true,
    });

    const request = axios({
        method: 'GET',
        url: `${baseUrl}list`,
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

export const fetchTopTen = (start=0, limit=5) => dispatch => {
    dispatch({
        type: FETCH_TOP_TEN_REQUEST,
        isFetching: true,
    });

    const request = axios({
        method: 'GET',
        url: `https://api.coinmarketcap.com/v2/ticker/?start=${start}&limit=${limit}&sort=rank`,
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
        url: `${baseUrl}history/${ticker}/USD`,
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
