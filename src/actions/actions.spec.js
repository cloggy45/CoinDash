import * as actions from "./action";
import * from "./actionTypes";

describe("actions", () => {
  it("should create an action to set selected options", () => {
    const payload = "BTC";
    const expectedAction = {
      type: SET_SELECTED,
      payload: payload
    };
    expect(actions.setSelected(payload)).toEqual(expectedAction);
  });

  it("should create an action that receives formatted tickers", () => {
    const payload = [{ label: "Bitcoin", value: "BTC" }];
    const expectedAction = {
      type: RECEIVE_TICKERS,
      payload: payload.map(data => {
        return { value: data.symbol, label: data.name };
      })
    };
    expect(actions.receiveTickers(payload)).toEqual(expectedAction);
  });

  it("should create an action that receives overview json", () => {
    const payload = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: "1",
        price_usd: "9267.46",
        price_btc: "1.0",
        "24h_volume_usd": "8738400000.0",
        market_cap_usd: "157554808551",
        available_supply: "17000862.0",
        total_supply: "17000862.0",
        max_supply: "21000000.0",
        percent_change_1h: "0.22",
        percent_change_24h: "5.09",
        percent_change_7d: "11.64",
        last_updated: "1524792874"
      }
    ];
    const expectedAction = {
      type: RECEIVE_OVERVIEW,
      payload: payload
    };
    expect(actions.receiveOverviewData(payload)).toEqual(expectedAction);
  });
});
