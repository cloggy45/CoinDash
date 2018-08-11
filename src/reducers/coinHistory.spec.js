import expect from 'expect';

import {coinHistory} from './coinHistory';

import {
    FETCH_COIN_HISTORY_FAILED,
    FETCH_COIN_HISTORY_SUCCESS,
    FETCH_COIN_HISTORY_REQUEST
} from '../actions/actionTypes';


describe('Coin History Reducer', () => {
    it('should return the initial state', () => {
        expect(coinHistory(undefined, {})).toEqual({
            isFetching: false,
            error: null,
            coinHistory: null
        });
    });

    it('should handle FETCH_COIN_HISTORY_REQUEST', () => {
        const action = {
            type: FETCH_COIN_HISTORY_REQUEST,
            isFetching: true
        };

        expect(coinHistory({}, action)).toEqual({
            isFetching: true
        })
    });

    it('should handle FETCH_COIN_HISTORY_SUCCESS', () => {
        const action = {
            type: FETCH_COIN_HISTORY_SUCCESS,
            payload: {
                "Some Data":"Some Value"
            },
            isFetching: false
        };
        expect(coinHistory({}, action)).toEqual({
            isFetching: false,
            coinHistory: {
                "Some Data":"Some Value"
            }
        })
    });

    it('should handle FETCH_COIN_HISTORY_FAILED', () => {
        const error = {
            error: 'Fetch coin history failed'
        };
        const action = {
            type: FETCH_COIN_HISTORY_FAILED,
            isFetching: false,
            payload: error
        };
        expect(coinHistory({}, action)).toEqual({
            isFetching: false,
            error: error,
            coinHistory: {}
        });
    });
});