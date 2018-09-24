import axios from 'axios';

import { CoinMarketConfig} from "../coinmarket-config";

import {
    FETCH_COIN_META_INFO_FAILED,
    FETCH_COIN_META_INFO_SUCCESS,
    FETCH_COIN_META_INFO_REQUEST,
} from "./actionTypes";

export const fetchCoinMetaInfo = () => dispatch => {
    dispatch({
        type: FETCH_COIN_META_INFO_REQUEST,
        isFetching: true
    });

    const request = axios({
        method: 'GET',
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
        header: {'X-CMC_PRO_API_KEY':CoinMarketConfig.apiKey}
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