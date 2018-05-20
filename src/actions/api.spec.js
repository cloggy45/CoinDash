import {
  fetchMarketOverviewData,
  fetchCoinData,
  fetchCoinHistory,
  fetchTickers
} from "./api";
import {
  RECEIVE_TICKERS,
  RECEIVE_COIN_DATA,
  RECEIVE_COIN_HISTORY_DATA,
  RECEIVE_MARKET_OVERVIEW_DATA
} from "./actionTypes";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store/dist/index-umd";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe("Test Async Actions", () => {
  let store = mockStore({ api: [] });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  it("Fetch market overview data", () => {
    const url = `https://api.coinmarketcap.com/v2/global/`;
    const payload = [
      {
        status: {
          timestamp: 1525566342,
          error: null
        },
        data: {
          active_cryptocurrencies: 1614,
          active_markets: 10773,
          bitcoin_percentage_of_market_cap: 35.8,
          quotes: {
            USD: {
              total_market_cap: 469453311242.0,
              total_volume_24h: 25434259865.0
            }
          },
          last_updated: 1525566272
        },
        metadata: {
          timestamp: 1525566342,
          error: null
        }
      }
    ];
    const expectedAction = [
      {
        type: RECEIVE_MARKET_OVERVIEW_DATA,
        payload: payload
      }
    ];
    mock.onGet(url).reply(200, payload);
    return store.dispatch(fetchMarketOverviewData()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("Fetch tickers", () => {
    const url = `https://api.coinmarketcap.com/v2/listings/`;
    const payload = [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        website_slug: "bitcoin"
      },
      {
        id: 2,
        name: "Litecoin",
        symbol: "LTC",
        website_slug: "litecoin"
      },
      {
        id: 3,
        name: "Namecoin",
        symbol: "NMC",
        website_slug: "namecoin"
      }
    ];

    const expectedAction = [
      {
        type: RECEIVE_TICKERS,
        payload: payload
      }
    ];
    mock.onGet(url).reply(200, payload);

    return store.dispatch(fetchTickers()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("Fetch history data", () => {
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;
    const payload = [
      {
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
      }
    ];
    const expectedAction = [
      {
        type: "RECEIVE_COIN_HISTORY_DATA",
        payload: payload
      }
    ];

    mock.onGet(url).reply(200, payload);

    return store.dispatch(fetchCoinHistory()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("Fetch coin data", () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    const payload = [
      {
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
      }
    ];

    const expectedAction = [
      {
        type: RECEIVE_COIN_DATA,
        payload: payload
      }
    ];

    mock.onGet(url).reply(200, payload);

    return store.dispatch(fetchCoinData()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
