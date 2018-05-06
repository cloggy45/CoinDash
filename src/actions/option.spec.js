import { SET_SELECTED } from "./actionTypes";
import { setSelected } from "./option";

describe("Overview actions", () => {
  it("should create an action to set selected options", () => {
    const payload = "BTC";
    const expectedAction = {
      type: SET_SELECTED,
      payload: payload
    };
    expect(setSelected(payload)).toEqual(expectedAction);
  });
});
