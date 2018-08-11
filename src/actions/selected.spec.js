import { SELECT_COIN } from "./actionTypes";
import { setSelectedCoin } from "./selected";

describe("Select Bitcoin from List", () => {
  it("Should send an action to set the selected coin", () => {
    const payload = "BTC";
    const expectedAction = {
      type: SELECT_COIN,
      payload: payload
    };
    expect(setSelectedCoin(payload)).toEqual(expectedAction);
  });
});
