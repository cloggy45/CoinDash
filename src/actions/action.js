import axios from "axios";

export const SELECT_CURRENCY = "SELECT_CURRENCY";
export const RECEIVE_TICKERS = "RECEIVE_TICKERS";
export const RECEIVE_OVERVIEW = "RECEIVE_OVERVIEW";

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

export const receiveOverviewData = json => {
  return {
    type: RECEIVE_OVERVIEW,
    payload: json
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

export function fetchOverviewData(currency = "") {
  return dispatch => {
    return axios
      .get(`https://api.coinmarketcap.com/v1/global/?convert=${currency}`)
      .then(response => {
        console.log(response.data);
        dispatch(receiveOverviewData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
