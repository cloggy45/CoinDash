import * as action from "./actionTypes";

export const setSelected = option => {
  return {
    type: action.SET_SELECTED,
    payload: option
  };
};

export const receiveTickers = json => {
  return {
    type: action.RECEIVE_TICKERS,
    payload: json.map(data => {
      return { value: data.symbol, label: data.name };
    })
  };
};
