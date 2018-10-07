import { watchlist } from './watchlist';
import * as types from '../../actions/firebase';
import {
    FETCH_WATCHLIST_REQUEST,
    FETCH_WATCHLIST_SUCCESS,
} from '../../actions/actionTypes';

describe('Watchlist Reducer', () => {
    it('should return the initial state', () => {
        expect(watchlist(undefined, {})).toEqual({
            isFetching: true,
            list: null,
            errorMessage: undefined,
        });
    });
    it('should handle FETCH_WATCHLIST_REQUEST', () => {
        const action = {
            type: FETCH_WATCHLIST_REQUEST,
            isFetching: true,
        };
        expect(watchlist({}, action)).toEqual({
            isFetching: true,
        });
    });

    it('should handle FETCH_WATCHLIST_SUCCESS', () => {
        const action = {
            type: FETCH_WATCHLIST_SUCCESS,
            isFetching: false,
            payload: { some: 'data' },
        };
        expect(watchlist({}, action)).toEqual({
            isFetching: false,
            list: {
                some: 'data',
            },
        });
    });
});
