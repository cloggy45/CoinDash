import * as action from "./actionTypes";

export const receiveOverviewData = json => {
  return {
    type: action.RECEIVE_OVERVIEW,
    payload: json
  };
};
