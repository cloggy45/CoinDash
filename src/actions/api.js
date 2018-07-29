import axios from "axios";
import {
  FETCH_TOP_TEN_REQUEST,
  FETCH_TOP_TEN_SUCCESS,
  FETCH_TOP_TEN_FAILED,
  RECEIVE_TICKERS,
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

export const receiveTickers = json => {
  return {
    type: RECEIVE_TICKERS,
    payload: json
  };
};

// Documentation https://coinmarketcap.com/api/#endpoint_listings
export function fetchTickers() {
  return dispatch => {
    return axios
      .get(`https://api.coinmarketcap.com/v2/listings/`)
      .then(response => {
        dispatch(receiveTickers(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export const fetchTopTen = () => dispatch => {
  dispatch({
    type: FETCH_TOP_TEN_REQUEST,
    isFetching: true
  });

  const request = axios({
    method: "GET",
    url: "https://api.coinmarketcap.com/v2/ticker/?limit=10",
    header: []
  });

  return request.then(
    response =>
      dispatch({
        type: FETCH_TOP_TEN_SUCCESS,
        payload: response.data,
        isFetching: false
      }),
    error =>
      dispatch({
        type: FETCH_TOP_TEN_FAILED,
        payload: error || "Failed to fetch top ten",
        isFetching: false
      })
  );
};
// return dispatch => {
//   return axios
//     .get(`https://api.coinmarketcap.com/v2/ticker/?limit=10`)
//     .then(response => {
//       dispatch({
//         type: FETCH_TOP_TEN_SUCCESS,
//         payload: response.data,
//         isFetching: false
//       });
//     })
//     .catch(error => {
//       dispatch({
//         type: FETCH_TOP_TEN_FAILED,
//         payload: error || "Error fetching top ten",
//         isFetching: false
//       });
//     });
// };

// Documentation  https://min-api.cryptocompare.com/
export function fetchCoinHistory(ticker) {
  return dispatch => {
    return axios
      .get(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`
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
