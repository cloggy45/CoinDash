import { coinPriceInfo } from './coinPriceInfo';
import expect from 'expect';
import {
    FETCH_COIN_PRICE_INFO_FAILED,
    FETCH_COIN_PRICE_INFO_REQUEST,
    FETCH_COIN_PRICE_INFO_SUCCESS,
} from '../../actions/actionTypes';

describe('Coin Specific Info Reducer', () => {
    it('should return the initial state', () => {
        expect(coinPriceInfo(undefined, {})).toEqual({
            isFetching: true,
            coinPriceInfo: null,
            hasError: false,
            errorMessage: null,
        });
    });

    it('should handle FETCH_COIN_PRICE_INFO_REQUEST', () => {
        expect(
            coinPriceInfo(undefined, {
                type: FETCH_COIN_PRICE_INFO_REQUEST,
                isFetching: true,
                hasError: false,
            })
        ).toEqual({
            isFetching: true,
            hasError: false,
            errorMessage: null,
            coinPriceInfo: null,
        });
    });

    it('should handle FETCH_COIN_PRICE_INFO_SUCCESS', () => {
        expect(
            coinPriceInfo(undefined, {
                type: FETCH_COIN_PRICE_INFO_SUCCESS,
                isFetching: false,
                errorMessage: null,
                hasError: false,
                payload: { SOME: 'DATA' },
            })
        ).toEqual({
            isFetching: false,
            hasError: false,
            errorMessage: null,
            coinPriceInfo: { SOME: 'DATA' },
        });
    });

    it('should handle FETCH_COIN_PRICE_INFO_FAILED', () => {
        expect(
            coinPriceInfo(undefined, {
                type: FETCH_COIN_PRICE_INFO_FAILED,
                isFetching: false,
                payload: 'SOME ERROR',
            })
        ).toEqual({
            isFetching: false,
            coinPriceInfo: null,
            hasError: true,
            errorMessage: 'SOME ERROR',
        });
    });
});
