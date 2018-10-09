import axios from 'axios';

import {
    FETCH_COIN_PRICE_INFO_FAILED,
    FETCH_COIN_PRICE_INFO_SUCCESS,
    FETCH_COIN_PRICE_INFO_REQUEST,
} from './actionTypes';

import has from 'lodash.has';

export const fetchCoinPriceInfo = ticker => dispatch => {
    dispatch({
        type: FETCH_COIN_PRICE_INFO_REQUEST,
        isFetching: true,
    });

    const request = axios({
        method: 'GET',
        url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`,
    });

    return request.then(
        response => {
            has(response.data, 'Response')
                ? dispatch({
                      type: FETCH_COIN_PRICE_INFO_FAILED,
                      payload: 'No coin information available...',
                      isFetching: false,
                      hasError: true,
                  })
                : dispatch({
                      type: FETCH_COIN_PRICE_INFO_SUCCESS,
                      payload: response.data,
                      isFetching: false,
                      hasError: false,
                  });
        },
        error => {
            dispatch({
                type: FETCH_COIN_PRICE_INFO_FAILED,
                payload: error || 'Failed to fetch coin price info',
                isFetching: false,
                hasError: true,
            });
        }
    );
};
