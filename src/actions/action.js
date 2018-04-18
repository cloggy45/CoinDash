import axios from "axios";

export const SELECT_CURRENCY = "SELECT_CURRENCY";
export const RECEIVE_TICKERS = "RECEIVE_TICKERS";

export const selectCurrency = currency => {
  return {
    type: SELECT_CURRENCY,
    payload: currency
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

export function fetchCoinData(ticker = "") {
  return dispatch => {
    return axios
      .get(`https://api.coinmarketcap.com/v1/ticker/${ticker}`)
      .then(response => {
        dispatch(receiveTickers(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
