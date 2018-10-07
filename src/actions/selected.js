import { SELECT_COIN } from './actionTypes';
import { fetchCoinPriceInfo } from './coinPriceInfo';

export const setSelectedCoin = (symbol, id) => {
    return {
        type: SELECT_COIN,
        payload: symbol,
        id: id,
    };
};
