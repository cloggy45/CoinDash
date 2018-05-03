import { SET_SELECTED, RECEIVE_TICKERS, REQUEST_DATA } from "./actionTypes";

export const setSelected = option => {
  return {
    type: SET_SELECTED,
    payload: option
  };
};

export const receiveTickers = json => {
  return {
    type: RECEIVE_TICKERS,
    payload: json.map(data => {
      return { value: data.symbol, label: data.name };
    })
  };
};

export const requestData = (requesting = false) => {
  return {
    type: REQUEST_DATA,
    payload: requesting
  };
};
