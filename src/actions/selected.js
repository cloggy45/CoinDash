import { SELECT_COIN } from "./actionTypes";

export const setSelectedCoin = coin => {
  return {
    type: SELECT_COIN,
    payload: coin
  };
};
