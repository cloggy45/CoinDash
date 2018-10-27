import { SELECT_COIN, SELECT_CURRENCY } from './actionTypes';

export const setSelectedCoin = (symbol, id) => ({
    type: SELECT_COIN,
    payload: symbol,
    id: id,

});

export const setSelectedCurrency = (currency) => ({
    type: SELECT_CURRENCY,
    payload: currency,
});