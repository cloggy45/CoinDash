import {SELECT_COIN} from "./actionTypes";
import {fetchCoinPriceInfo} from './coinPriceInfo';

export const setSelectedCoin = (symbol,id) => dispatch => {

    dispatch(fetchCoinPriceInfo(symbol));

    return dispatch({
        type: SELECT_COIN,
        payload: symbol,
        id: id
    });
};
