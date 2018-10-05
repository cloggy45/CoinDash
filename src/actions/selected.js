import {SELECT_COIN} from "./actionTypes";

export const setSelectedCoin = (symbol, id) => {
    return {
        type: SELECT_COIN,
        payload: symbol,
        id: id
    };
};
