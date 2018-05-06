import axios from "axios";
import {
  RECEIVE_COIN_DATA,
  RECEIVE_MARKET_OVERVIEW_DATA,
  RECEIVE_COIN_HISTORY_DATA
} from "./actionTypes";

export const receiveMarketOverviewData = json => {
  return {
    type: RECEIVE_MARKET_OVERVIEW_DATA,
    payload: json
  };
};

export const receiveCoinHistoryData = json => {
  return {
    type: RECEIVE_COIN_HISTORY_DATA,
    payload: json
  };
};

export const receiveCoinData = json => {
  return {
    type: RECEIVE_COIN_DATA,
    payload: json
  };
};

// Documentation  https://min-api.cryptocompare.com/
export function fetchCoinHistory(ticker = "BTC", currency = "USD") {
  return dispatch => {
    return axios
      .get(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=${currency}&limit=60&aggregate=3&e=CCCAGG`
      )
      .then(response => {
        dispatch(receiveCoinHistoryData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// Documentation https://api.coinmarketcap.com/v2/ticker/?limit=10
export function fetchCoinData() {
  return dispatch => {
    return axios
      .get(`https://api.coinmarketcap.com/v2/ticker/`)
      .then(response => {
        dispatch(receiveCoinData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchMarketOverviewData(currency = "") {
  return dispatch => {
    return axios
      .get(`https://api.coinmarketcap.com/v2/global/`)
      .then(response => {
        dispatch(receiveMarketOverviewData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
