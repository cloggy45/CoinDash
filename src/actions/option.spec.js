import { SET_SELECTED, RECEIVE_TICKERS, REQUEST_DATA } from "./actionTypes";
import { setSelected, receiveTickers, requestData } from "./option";

describe("Overview actions", () => {
  it("should create an action to set selected options", () => {
    const payload = "BTC";
    const expectedAction = {
      type: SET_SELECTED,
      payload: payload
    };
    expect(setSelected(payload)).toEqual(expectedAction);
  });

  it("should create an action that receives formatted tickers", () => {
    const payload = [{ label: "Bitcoin", value: "BTC" }];
    const expectedAction = {
      type: RECEIVE_TICKERS,
      payload: payload.map(data => {
        return { value: data.symbol, label: data.name };
      })
    };
    expect(receiveTickers(payload)).toEqual(expectedAction);
  });

  it("should create an action that indicates that we are requesting data", () => {
    const payload = true;
    const expectedAction = {
      type: REQUEST_DATA,
      payload: payload
    };
    expect(requestData(payload)).toEqual(expectedAction);
  });
});
