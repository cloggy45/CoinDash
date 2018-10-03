import axios from 'axios';

import {
    FETCH_COIN_META_INFO_FAILED,
    FETCH_COIN_META_INFO_SUCCESS,
    FETCH_COIN_META_INFO_REQUEST,
} from "./actionTypes";

export const fetchCoinMetaInfo = id => dispatch => {
    dispatch({
        type: FETCH_COIN_META_INFO_REQUEST,
        isFetching: true
    });

    const request = axios({
        method: 'GET',
        url: `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_COIN_META_INFO_SUCCESS,
                payload: response.data,
                isFetching: false
            }),
        error =>
            dispatch({
                type: FETCH_COIN_META_INFO_FAILED,
                payload: error || 'Failed to fetch coin meta info',
                isFetching: false
            })
    )
};