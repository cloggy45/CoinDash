export const api = (currentState = {}, action) => {
  switch (action.type) {
    case "REQUEST_DATA":
      return Object.assign({}, currentState, {
        requesting: action.payload
      });
    case "RECEIVE_TICKERS":
      return Object.assign({}, currentState, {
        tickers: action.payload
      });
    case "RECEIVE_COIN_DATA":
      return Object.assign({}, currentState, {
        coinData: action.payload
      });
    case "RECEIVE_COIN_HISTORY_DATA":
      return Object.assign({}, currentState, {
        coinHistoryData: action.payload
      });
    case "FETCH_TOP_TEN_SUCCESS":
      return Object.assign({}, currentState, {
        topTen: action.payload,
        isFetching: action.isFetching
      });
    case "FETCH_TOP_TEN_FAILED":
      return Object.assign({}, currentState, {
        errorMessage: action.payload,
        isFetching: false
      });
    case "FETCH_TOP_TEN_REQUEST":
      return Object.assign({}, currentState, {
        isFetching: action.payload
      });
    case "RECEIVE_MARKET_OVERVIEW_DATA":
      return Object.assign({}, currentState, {
        marketOverviewData: action.payload
      });
    default:
      return currentState;
  }
};
