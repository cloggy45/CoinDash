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
            error: null,
        });
    });

    it('should handle FETCH_COIN_PRICE_INFO_REQUEST', () => {
        expect(
            coinPriceInfo(undefined, {
                type: FETCH_COIN_PRICE_INFO_REQUEST,
                isFetching: true,
            })
        ).toEqual({
            isFetching: true,
            error: null,
            coinPriceInfo: null,
        });
    });

    it('should handle FETCH_COIN_PRICE_INFO_SUCCESS', () => {
        expect(
            coinPriceInfo(undefined, {
                type: FETCH_COIN_PRICE_INFO_SUCCESS,
                isFetching: false,
                payload: { SOME: 'DATA' },
            })
        ).toEqual({
            isFetching: false,
            error: null,
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
            error: 'SOME ERROR',
        });
    });
});
