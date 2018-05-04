import axios from "axios";
import { receiveHistoryData } from "./graph";
import { receiveOverviewData } from "./overview";
import { receiveTickers } from "./option";
import { REQUEST_FAILED, REQUEST_SUCCESSFUL } from "./actionTypes";

export const requestSuccessful = () => {
  return {
    type: "REQUEST_SUCCESSFUL",
    payload: true
  };
};

export const requestFailed = () => {
  return {
    type: "REQUEST_FAILED",
    payload: true
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
        dispatch(requestSuccessful);
        dispatch(receiveHistoryData(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailed);
      });
  };
}

// Documentation https://coinmarketcap.com/api/
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
        dispatch(receiveOverviewData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
