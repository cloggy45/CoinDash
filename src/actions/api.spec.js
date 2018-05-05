import { fetchOverviewData, fetchCoinData, fetchCoinHistory } from "./api";
import {
  RECEIVE_OVERVIEW,
  RECEIVE_TICKERS,
  RECEIVE_HISTORY
} from "./actionTypes";
import configureMockStore from "redux-mock-store/dist/index-umd";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Test Async Actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  beforeEach(() => {
    const store = mockStore({ api: [] });
  });

  it("Fetch coin history", () => {
    const payload = {
      Response: "Success",
      Type: 100,
      Aggregated: false,
      Data: [
        {
          time: 1525392000,
          close: 9699.61,
          high: 9785.15,
          low: 9547.21,
          open: 9746.26,
          volumefrom: 68689.75,
          volumeto: 663887678.35
        },
        {
          time: 1525478400,
          close: 9829.86,
          high: 9867.73,
          low: 9687.09,
          open: 9700.37,
          volumefrom: 13221.7,
          volumeto: 129475220.07
        }
      ],
      TimeTo: 1525478400,
      TimeFrom: 1525392000,
      FirstValueInArray: true,
      ConversionType: { type: "direct", conversionSymbol: "" }
    };

    fetchMock.getOnce("/history", payload);
    const store = mockStore({ api: [] });

    const expectedActions = {
      type: RECEIVE_HISTORY,
      payload: payload
    };

    return store.dispatch(fetchCoinHistory()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetch ticker information", () => {
    const payload = {
      data: {
        "1": {
          id: 1,
          name: "Bitcoin",
          symbol: "BTC",
          website_slug: "bitcoin",
          rank: 1,
          circulating_supply: 17015687.0,
          total_supply: 17015687.0,
          max_supply: 21000000.0,
          quotes: {
            USD: {
              price: 9798.31,
              volume_24h: 8314730000.0,
              market_cap: 166724976089.0,
              percent_change_1h: 0.2,
              percent_change_24h: 1.83,
              percent_change_7d: 7.64
            }
          },
          last_updated: 1525489471
        }
      }
    };

    fetchMock.getOnce("/ticker", payload);
    const store = mockStore({ api: [] });

    const expectedActions = {
      type: RECEIVE_TICKERS,
      payload: payload
    };

    return store.dispatch(fetchCoinData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetch overview data", () => {
    const payload = {
      active_assets: 725,
      active_currencies: 889,
      active_markets: 10750,
      bitcoin_percentage_of_market_cap: 36.1,
      last_updated: 1525489172,
      total_24h_volume_usd: 27483675790,
      total_market_cap_usd: 462022687714
    };

    fetchMock.getOnce("/oveview", payload);
    const store = mockStore({ api: [] });

    const expectedActions = {
      type: RECEIVE_OVERVIEW,
      payload: payload
    };

    return store.dispatch(fetchOverviewData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
