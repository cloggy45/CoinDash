import { combineReducers } from "redux";
import { api } from "./api";
import { option } from "./option";

const rootReducer = combineReducers({
  api,
  option
});

export default rootReducer;
