import { selected } from './selected';
import expect from 'expect';
import { SELECT_COIN } from '../../actions/actionTypes';

describe('Selected Reducer', () => {
    it('should return the initial state', () => {
        expect(selected(undefined, {})).toEqual({
            selectedCoin: 'DOGE',
            selectedId: 4432,
            selectedCurrency: 'USD'
        });
    });
    it('should handle SELECT_COIN', () => {
        const action = {
            type: SELECT_COIN,
            payload: 'DOGE',
        };
        expect(selected({}, action)).toEqual({
            selectedCoin: 'DOGE',
        });
    });
});
