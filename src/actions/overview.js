import { RECEIVE_OVERVIEW } from "./actionTypes";

export const receiveOverviewData = json => {
  return {
    type: RECEIVE_OVERVIEW,
    payload: json
  };
};
