import { combineReducers } from "redux";
import { click } from "../actions/action";

const Options = (currentState = {}, action) => {
  switch (action.type) {
    case "SELECT_CURRENCY":
      return Object.assign({}, currentState, {
        currency: action.payload
      });
    case "RECEIVE_TICKERS":
      return Object.assign({}, currentState, {
        tickers: action.payload
      });
    default:
      return currentState;
  }
};

const graph = (currentState = {}, action) => {
  switch (action.type) {
    case "IS_LOADED":
      const nextState = [
        ...currentState,
        {
          isLoaded: action.isLoaded
        }
      ];
      return nextState;
      break;
    default:
      return currentState;
  }
};

const rootReducer = combineReducers({
  Options,
  graph
});

export default rootReducer;
