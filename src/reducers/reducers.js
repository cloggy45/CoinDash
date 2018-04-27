import { combineReducers } from "redux";

const options = (currentState = {}, action) => {
  switch (action.type) {
    case "SELECT_CURRENCY":
      return Object.assign({}, currentState, {
        currency: action.payload
      });
    case "SET_SELECTED":
      return Object.assign({}, currentState, {
        selected: action.payload
      });
    case "RECEIVE_TICKERS":
      return Object.assign({}, currentState, {
        tickers: action.payload
      });
    case "RECEIVE_SELECTED":
      return Object.assign({}, currentState, {
        ticker: action.payload
      });
    default:
      return currentState;
  }
};

const overview = (currentState = {}, action) => {
  switch (action.type) {
    case "RECEIVE_OVERVIEW":
      return Object.assign({}, currentState, {
        overview: action.payload
      });
    default:
      return currentState;
  }
};

const graph = (currentState = {}, action) => {
  switch (action.type) {
    case "RECEIVE_HISTORY":
      return Object.assign({}, currentState, {
        history: action.payload
      });
    default:
      return currentState;
  }
};

const rootReducer = combineReducers({
  options,
  overview,
  graph
});

export default rootReducer;
