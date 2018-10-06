import {
    SELECT_COIN
} from "../actionTypes";
import {
    setSelectedCoin
} from "../selected";

import {
    mockStore
} from '../setupAsyncTests';

describe("Select Dogecoin from List", () => {
    let store = mockStore({
        selected: []
    });
    afterEach(() => {
        store.clearActions();
    });


    it("Should send an action to set the selected coin", () => {
        store.dispatch(setSelectedCoin('DOGE',4432))()
        expect(store.getActions()).toEqual([{ type: 'FETCH_COIN_PRICE_INFO_REQUEST', isFetching: true }, { type: 'SELECT_COIN', payload: 'DOGE', id: 4432 }]);
    });
});