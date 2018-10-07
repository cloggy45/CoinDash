import { SELECT_COIN } from '../actionTypes';
import { setSelectedCoin } from '../selected';

describe('Select DOGE from List', () => {
    it('Should send an action to set the selected coin', () => {
        const expectedAction = {
            type: SELECT_COIN,
            payload: 'DOGE',
            id: 4432,
        };
        expect(setSelectedCoin('DOGE', 4432)).toEqual(expectedAction);
    });
});
