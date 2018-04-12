import { combineReducers } from "redux";
import { click } from "../actions/action";

const select = (currentState = {}, action) => {
  switch (action.type) {
    case "SELECT_CURRENCY":
      const nextState = [
        ...currentState,
        {
          currency: action.currency
        }
      ];
      return nextState;
      break;
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
  select,
  graph
});

export default rootReducer;
