import { SET_SELECTED } from "./actionTypes";

export const setSelected = option => {
  return {
    type: SET_SELECTED,
    payload: option
  };
};
