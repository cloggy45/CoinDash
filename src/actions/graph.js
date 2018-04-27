import { RECEIVE_HISTORY } from "./actionTypes";

export const receiveHistoryData = json => {
  return {
    type: RECEIVE_HISTORY,
    payload: json.Data.map(data => data)
  };
};
