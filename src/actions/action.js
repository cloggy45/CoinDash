import axios from "axios";

export const SELECT_CURRENCY = "SELECT_CURRENCY";
export const RECEIVE_TICKERS = "RECEIVE_TICKERS";
export const RECEIVE_OVERVIEW = "RECEIVE_OVERVIEW";
export const RECEIVE_HISTORY = "RECEIVE_HISTORY";
export const SET_SELECTED = "SET_SELECTED";

export const setSelected = option => {
  return {
    type: SET_SELECTED,
    payload: option
  };
};

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

export const receiveHistoryData = json => {
  return {
    type: RECEIVE_HISTORY,
    payload: json.Data.map(data => data)
  };
};

// https://min-api.cryptocompare.com/
export function fetchCoinHistory(ticker = "BTC", currency = "USD") {
  return dispatch => {
    return axios
      .get(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=${currency}&limit=60&aggregate=3&e=CCCAGG`
      )
      .then(response => {
        dispatch(receiveHistoryData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

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
