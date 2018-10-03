import { marketOverview } from './marketOverview';
import expect from 'expect';
import { FETCH_MARKET_OVERVIEW_REQUEST, FETCH_MARKET_OVERVIEW_SUCCESS } from '../../actions/actionTypes';

describe('Market Overview Reducer', () => {
    it('should return the initial state', () => {
        expect(marketOverview(undefined, {})).toEqual({
            isFetching: true,
            marketOverview: null,
            error: null
        });
    });

    it('should handle FETCH_MARKET_OVERVIEW_REQUEST', () => {
        const someAction = {
            type: FETCH_MARKET_OVERVIEW_REQUEST,
            isFetching: true
        };

        expect(marketOverview({}, someAction)).toEqual({
            isFetching: true
        })
    });

    it('should handle FETCH_MARKET_OVERVIEW_SUCCESS', () => {
        const someAction = {
            type: FETCH_MARKET_OVERVIEW_SUCCESS,
            isFetching: false,
            payload: ["Some Data"]
        };

        expect(marketOverview({}, someAction)).toEqual({
            isFetching: false,
            marketOverview: ["Some Data"]
        });
    })

});