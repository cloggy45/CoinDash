import * as action from "./actionTypes";

export const receiveHistoryData = json => {
  return {
    type: action.RECEIVE_HISTORY,
    payload: json.Data.map(data => data)
  };
};
