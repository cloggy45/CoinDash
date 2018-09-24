import expect from 'expect';

import { coinMetaInfo } from './coinMetaInfo';

import {
    FETCH_COIN_META_INFO_FAILED,
    FETCH_COIN_META_INFO_SUCCESS,
    FETCH_COIN_META_INFO_REQUEST
} from '../../actions/actionTypes';

describe('Coin Meta Info Reducer', () => {
    it('should return the initial state', () => {
        expect(coinMetaInfo(undefined, {})).toEqual({
            isFetching: false,
            coinMetaInfo: null
        })
    });

    it('should handle FETCH_COIN_META_INFO_SUCCESS', () => {
       const action = {
           type: FETCH_COIN_META_INFO_SUCCESS,
           payload: {
               Data : {
                   "Some Data": "Some Value"
               }
           },
           isFetching: false
       };

       expect(coinMetaInfo({}, action)).toEqual({
           isFetching: false,
           coinMetaInfo: {
               "Some Data": "Some Value"
           }
       });
    });

    it('should handle FETCH_COIN_META_INFO_REQUEST', () => {
        const action  = {
            type: FETCH_COIN_META_INFO_REQUEST,
            isFetching: true
        };
        expect(coinMetaInfo({}, action)).toEqual({
            isFetching: true
        });
    });

    it('should handle FETCH_COIN_META_INFO_FAILED', () => {
        const action = {
            type: FETCH_COIN_META_INFO_FAILED,
            isFetching: false,
            payload: 'FAILED'
        };

        expect(coinMetaInfo({}, action)).toEqual({
            isFetching: false,
            coinMetaInfo: 'FAILED'
        })
    })
});