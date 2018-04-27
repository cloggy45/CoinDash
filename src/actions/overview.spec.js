import { RECEIVE_OVERVIEW } from "./actionTypes";
import { receiveOverviewData } from "./overview";

describe("Overview actions", () => {
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
    expect(receiveOverviewData(payload)).toEqual(expectedAction);
  });
});
