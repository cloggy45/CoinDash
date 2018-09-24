import axios from 'axios';

import { CoinMarketConfig } from "../coinmarket-config";

import {
    FETCH_COIN_PRICE_INFO_FAILED,
    FETCH_COIN_PRICE_INFO_SUCCESS,
    FETCH_COIN_PRICE_INFO_REQUEST, FETCH_COIN_META_INFO_SUCCESS, FETCH_COIN_META_INFO_FAILED
} from "./actionTypes";

export const fetchCoinPriceInfo = () => dispatch => {
    dispatch({
        type: FETCH_COIN_PRICE_INFO_REQUEST,
        isFetching: true
    });

    const request = axios({
        method: 'GET',
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        header: {'X-CMC_PRO_API_KEY':CoinMarketConfig.apiKey}
    });

    return request.then(
        response =>
            dispatch({
                type: FETCH_COIN_PRICE_INFO_SUCCESS,
                payload: response.data,
                isFetching: false
            }),
        error =>
            dispatch({
                type: FETCH_COIN_PRICE_INFO_FAILED,
                payload: error || 'Failed to fetch coin price info',
                isFetching: false
            })
    )
};