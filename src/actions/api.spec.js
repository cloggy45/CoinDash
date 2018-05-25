import {
  fetchMarketOverviewData,
  fetchTopTen,
  fetchCoinData,
  fetchCoinHistory,
  fetchTickers
} from "./api";
import {
  RECEIVE_TICKERS,
  RECEIVE_COIN_DATA,
  RECEIVE_COIN_HISTORY_DATA,
  RECEIVE_TOP_TEN,
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
  afterAll(() => {
    mock.restore();
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

    return store.dispatch(fetchCoinHistory("BTC")).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("Fetch top ten coins", () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/?limit=10`;

    const payload = [
      {
        data: {
          "1": {
            id: 1,
            name: "Bitcoin",
            symbol: "BTC",
            website_slug: "bitcoin",
            rank: 1,
            circulating_supply: 17052825.0,
            total_supply: 17052825.0,
            max_supply: 21000000.0,
            quotes: {
              USD: {
                price: 7582.37,
                volume_24h: 6018450000.0,
                market_cap: 129300828695.0,
                percent_change_1h: -0.35,
                percent_change_24h: -0.17,
                percent_change_7d: -6.4
              }
            },
            last_updated: 1527208772
          },
          "1027": {
            id: 1027,
            name: "Ethereum",
            symbol: "ETH",
            website_slug: "ethereum",
            rank: 2,
            circulating_supply: 99646013.0,
            total_supply: 99646013.0,
            max_supply: null,
            quotes: {
              USD: {
                price: 593.622,
                volume_24h: 2754600000.0,
                market_cap: 59152065362.0,
                percent_change_1h: -1.49,
                percent_change_24h: 0.5,
                percent_change_7d: -12.31
              }
            },
            last_updated: 1527209059
          },
          "52": {
            id: 52,
            name: "Ripple",
            symbol: "XRP",
            website_slug: "ripple",
            rank: 3,
            circulating_supply: 39189968239.0,
            total_supply: 99992233977.0,
            max_supply: 100000000000.0,
            quotes: {
              USD: {
                price: 0.626543,
                volume_24h: 432385000.0,
                market_cap: 24554200270.0,
                percent_change_1h: -1.0,
                percent_change_24h: 3.15,
                percent_change_7d: -6.35
              }
            },
            last_updated: 1527209041
          },
          "1831": {
            id: 1831,
            name: "Bitcoin Cash",
            symbol: "BCH",
            website_slug: "bitcoin-cash",
            rank: 4,
            circulating_supply: 17146025.0,
            total_supply: 17146025.0,
            max_supply: 21000000.0,
            quotes: {
              USD: {
                price: 1045.08,
                volume_24h: 770112000.0,
                market_cap: 17918967807.0,
                percent_change_1h: -2.52,
                percent_change_24h: 2.51,
                percent_change_7d: -13.45
              }
            },
            last_updated: 1527209053
          },
          "1765": {
            id: 1765,
            name: "EOS",
            symbol: "EOS",
            website_slug: "eos",
            rank: 5,
            circulating_supply: 877257971.0,
            total_supply: 900000000.0,
            max_supply: 1000000000.0,
            quotes: {
              USD: {
                price: 12.503,
                volume_24h: 2153640000.0,
                market_cap: 10968356412.0,
                percent_change_1h: -2.58,
                percent_change_24h: 12.54,
                percent_change_7d: -0.51
              }
            },
            last_updated: 1527209053
          },
          "2": {
            id: 2,
            name: "Litecoin",
            symbol: "LTC",
            website_slug: "litecoin",
            rank: 6,
            circulating_supply: 56682898.0,
            total_supply: 56682898.0,
            max_supply: 84000000.0,
            quotes: {
              USD: {
                price: 122.355,
                volume_24h: 342392000.0,
                market_cap: 6935435997.0,
                percent_change_1h: -0.42,
                percent_change_24h: 1.67,
                percent_change_7d: -7.8
              }
            },
            last_updated: 1527209041
          },
          "512": {
            id: 512,
            name: "Stellar",
            symbol: "XLM",
            website_slug: "stellar",
            rank: 7,
            circulating_supply: 18577851493.0,
            total_supply: 103966327161.0,
            max_supply: null,
            quotes: {
              USD: {
                price: 0.291006,
                volume_24h: 44726000.0,
                market_cap: 5406266252.0,
                percent_change_1h: -0.85,
                percent_change_24h: 3.0,
                percent_change_7d: -7.76
              }
            },
            last_updated: 1527209045
          },
          "2010": {
            id: 2010,
            name: "Cardano",
            symbol: "ADA",
            website_slug: "cardano",
            rank: 8,
            circulating_supply: 25927070538.0,
            total_supply: 31112483745.0,
            max_supply: 45000000000.0,
            quotes: {
              USD: {
                price: 0.205011,
                volume_24h: 126091000.0,
                market_cap: 5315334658.0,
                percent_change_1h: -2.28,
                percent_change_24h: -0.68,
                percent_change_7d: -15.49
              }
            },
            last_updated: 1527209056
          },
          "1958": {
            id: 1958,
            name: "TRON",
            symbol: "TRX",
            website_slug: "tron",
            rank: 9,
            circulating_supply: 65748111645.0,
            total_supply: 100000000000.0,
            max_supply: null,
            quotes: {
              USD: {
                price: 0.0721507,
                volume_24h: 575169000.0,
                market_cap: 4743772279.0,
                percent_change_1h: -1.6,
                percent_change_24h: 1.46,
                percent_change_7d: 7.64
              }
            },
            last_updated: 1527209055
          },
          "1720": {
            id: 1720,
            name: "IOTA",
            symbol: "MIOTA",
            website_slug: "iota",
            rank: 10,
            circulating_supply: 2779530283.0,
            total_supply: 2779530283.0,
            max_supply: 2779530283.0,
            quotes: {
              USD: {
                price: 1.51036,
                volume_24h: 65801200.0,
                market_cap: 4198091358.0,
                percent_change_1h: -1.43,
                percent_change_24h: 0.19,
                percent_change_7d: -13.26
              }
            },
            last_updated: 1527209052
          }
        },
        metadata: {
          timestamp: 1527208832,
          num_cryptocurrencies: 1623,
          error: null
        }
      }
    ];

    const expectedAction = [
      {
        type: RECEIVE_TOP_TEN,
        payload: payload
      }
    ];

    mock.onGet(url).reply(200, payload);
    return store.dispatch(fetchTopTen()).then(() => {
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
