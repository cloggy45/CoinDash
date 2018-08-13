import axios from 'axios';

import {
    FETCH_MARKET_OVERVIEW_SUCCESS,
    FETCH_MARKET_OVERVIEW_REQUEST,
    FETCH_MARKET_OVERVIEW_FAILED
} from './actionTypes';


export const fetchMarketOverview = () => dispatch => {

    dispatch({
       type: FETCH_MARKET_OVERVIEW_REQUEST,
       isFetching: true
    });

    const request = axios({
        method: 'GET',
        url: 'https://api.coinmarketcap.com/v2/global/',
        header: []
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_MARKET_OVERVIEW_SUCCESS,
                payload: response.data,
                isFetching: false
            }),
        error =>
            dispatch({
                type: FETCH_MARKET_OVERVIEW_FAILED,
                payload: error || 'Failed to fetch market overview',
                isFetching: false
            })
    )
};