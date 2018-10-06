import {
  fetchTopTen,
  fetchCoinData,
  fetchCoinHistory,
  fetchCoinList
} from '../api';
import {
  FETCH_TOP_TEN_REQUEST,
  FETCH_TOP_TEN_SUCCESS,
  FETCH_TOP_TEN_FAILED,
  FETCH_COIN_HISTORY_REQUEST,
  FETCH_COIN_HISTORY_SUCCESS,
  FETCH_COIN_HISTORY_FAILED,
  RECEIVE_TICKERS,
  RECEIVE_COIN_LIST,
  RECEIVE_COIN_DATA,
  RECEIVE_MARKET_OVERVIEW_DATA,
} from '../actionTypes';

import {
  mock,
  mockStore
} from '../setupAsyncTests'


describe('Test Async Actions', () => {
  let store = mockStore({
    api: []
  });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  afterAll(() => {
    mock.restore();
  });

  it('Fetch coin list', () => {
    const url = `https://min-api.cryptocompare.com/data/all/coinlist`;
    const payload = [{"Response":"Success","Message":"Coin list succesfully returned!","Data":{"42":{"Id":"4321","Url":"/coins/42/overview","ImageUrl":"/media/12318415/42.png","Name":"42","Symbol":"42","CoinName":"42 Coin","FullName":"42 Coin (42)","Algorithm":"Scrypt","ProofType":"PoW/PoS","FullyPremined":"0","TotalCoinSupply":"42","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"34","Sponsored":false,"IsTrading":true},"300":{"Id":"749869","Url":"/coins/300/overview","ImageUrl":"/media/27010595/300.png","Name":"300","Symbol":"300","CoinName":"300 token","FullName":"300 token (300)","Algorithm":"N/A","ProofType":"N/A","FullyPremined":"0","TotalCoinSupply":"300","BuiltOn":"7605","SmartContractAddress":"0xaec98a708810414878c3bcdf46aad31ded4a4557","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"2212","Sponsored":false,"IsTrading":true},"365":{"Id":"33639","Url":"/coins/365/overview","ImageUrl":"/media/352070/365.png","Name":"365","Symbol":"365","CoinName":"365Coin","FullName":"365Coin (365)","Algorithm":"X11","ProofType":"PoW/PoS","FullyPremined":"0","TotalCoinSupply":"2300000000","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"916","Sponsored":false,"IsTrading":true},"404":{"Id":"21227","Url":"/coins/404/overview","ImageUrl":"/media/351001/404.png","Name":"404","Symbol":"404","CoinName":"404Coin","FullName":"404Coin (404)","Algorithm":"Scrypt","ProofType":"PoW/PoS","FullyPremined":"0","TotalCoinSupply":"532000000","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"602","Sponsored":false,"IsTrading":true},"611":{"Id":"20909","Url":"/coins/611/overview","ImageUrl":"/media/350985/611.png","Name":"611","Symbol":"611","CoinName":"SixEleven","FullName":"SixEleven (611)","Algorithm":"SHA256","ProofType":"PoW","FullyPremined":"0","TotalCoinSupply":"611000","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"586","Sponsored":false,"IsTrading":true},"808":{"Id":"28223","Url":"/coins/808/overview","ImageUrl":"/media/351513/808.png","Name":"808","Symbol":"808","CoinName":"808","FullName":"808 (808)","Algorithm":"SHA256","ProofType":"PoW/PoS","FullyPremined":"0","TotalCoinSupply":"N/A","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"750","Sponsored":false,"IsTrading":true},"888":{"Id":"29462","Url":"/coins/888/overview","ImageUrl":"/media/351639/888.png","Name":"888","Symbol":"888","CoinName":"Octocoin","FullName":"Octocoin (888)","Algorithm":"N/A","ProofType":"PoW","FullyPremined":"0","TotalCoinSupply":"135776563","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"811","Sponsored":false,"IsTrading":true},"1337":{"Id":"20824","Url":"/coins/1337/overview","ImageUrl":"/media/350976/1337.png","Name":"1337","Symbol":"1337","CoinName":"1337","FullName":"1337 (1337)","Algorithm":"X13","ProofType":"PoW/PoS","FullyPremined":"0","TotalCoinSupply":"314159265359","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"577","Sponsored":false,"IsTrading":true},
"BIP":{"Id":"925824","Url":"/coins/bip/overview","ImageUrl":"/media/34478541/bip.png","Name":"BIP","Symbol":"BIP","CoinName":"Minter","FullName":"Minter (BIP)","Algorithm":"N/A","ProofType":"DPoS/LPoS","FullyPremined":"0","TotalCoinSupply":"10000000000","BuiltOn":"N/A","SmartContractAddress":"N/A","PreMinedValue":"N/A","TotalCoinsFreeFloat":"N/A","SortOrder":"3386","Sponsored":false,"IsTrading":true}},"BaseImageUrl":"https://www.cryptocompare.com","BaseLinkUrl":"https://www.cryptocompare.com"}]

    const receiveCoinListAction = {
      type: RECEIVE_TICKERS,
      payload: payload
    };
    
    const receiveCoinTickersAction = {
      type: RECEIVE_COIN_LIST,
      payload: payload
    }
    
    mock.onGet(url).reply(200, payload);
    console.log(mock);
    return store.dispatch(fetchCoinList()).then(() => {
      expect(store.getActions()).toEqual([receiveCoinListAction, receiveCoinTickersAction]);
    });
  });

  describe('Fetch history data', () => {
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;
    const payload = [{
      Response: 'Success',
      Type: 100,
      Aggregated: false,
      Data: [{
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
      ConversionType: {
        type: 'direct',
        conversionSymbol: ''
      }
    }];

    const actionRequest = {
      type: FETCH_COIN_HISTORY_REQUEST,
      isFetching: true
    };

    const actionSuccess = {
      type: FETCH_COIN_HISTORY_SUCCESS,
      payload: payload,
      isFetching: false
    };

    const actionFailed = {
      type: FETCH_COIN_HISTORY_FAILED,
      payload: new Error('Network Error'),
      isFetching: false
    };

    it('should fetch coin history', () => {
      mock.onGet(url).reply(200, payload);
      return store.dispatch(fetchCoinHistory('BTC')).then(() => {
        expect(store.getActions()).toEqual([actionRequest, actionSuccess]);
      })
    });


    it('should fail to fetch coin history', () => {
      mock.onGet(url).networkError();
      return store.dispatch(fetchCoinHistory('BTC')).then(() => {
        expect(store.getActions()).toEqual([actionRequest, actionFailed]);
      });
    });

  });

  describe('Fetch top ten actions', () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/?limit=10`;
    const payload = [{
      '1': {
        circulating_supply: 17052825,
        id: 1,
        last_updated: 1527208772,
        max_supply: 21000000,
        name: 'Bitcoin',
        quotes: {
          USD: {
            market_cap: 129300828695,
            percent_change_1h: -0.35,
            percent_change_24h: -0.17,
            percent_change_7d: -6.4,
            price: 7582.37,
            volume_24h: 6018450000
          }
        },
        rank: 1,
        symbol: 'BTC',
        total_supply: 17052825,
        website_slug: 'bitcoin'
      },
      '1027': {
        circulating_supply: 99646013,
        id: 1027,
        last_updated: 1527209059,
        max_supply: null,
        name: 'Ethereum',
        quotes: {
          USD: {
            market_cap: 59152065362,
            percent_change_1h: -1.49,
            percent_change_24h: 0.5,
            percent_change_7d: -12.31,
            price: 593.622,
            volume_24h: 2754600000
          }
        },
        rank: 2,
        symbol: 'ETH',
        total_supply: 99646013,
        website_slug: 'ethereum'
      },
      '1720': {
        circulating_supply: 2779530283,
        id: 1720,
        last_updated: 1527209052,
        max_supply: 2779530283,
        name: 'IOTA',
        quotes: {
          USD: {
            market_cap: 4198091358,
            percent_change_1h: -1.43,
            percent_change_24h: 0.19,
            percent_change_7d: -13.26,
            price: 1.51036,
            volume_24h: 65801200
          }
        },
        rank: 10,
        symbol: 'MIOTA',
        total_supply: 2779530283,
        website_slug: 'iota'
      },
      '1765': {
        circulating_supply: 877257971,
        id: 1765,
        last_updated: 1527209053,
        max_supply: 1000000000,
        name: 'EOS',
        quotes: {
          USD: {
            market_cap: 10968356412,
            percent_change_1h: -2.58,
            percent_change_24h: 12.54,
            percent_change_7d: -0.51,
            price: 12.503,
            volume_24h: 2153640000
          }
        },
        rank: 5,
        symbol: 'EOS',
        total_supply: 900000000,
        website_slug: 'eos'
      },
      '1831': {
        circulating_supply: 17146025,
        id: 1831,
        last_updated: 1527209053,
        max_supply: 21000000,
        name: 'Bitcoin Cash',
        quotes: {
          USD: {
            market_cap: 17918967807,
            percent_change_1h: -2.52,
            percent_change_24h: 2.51,
            percent_change_7d: -13.45,
            price: 1045.08,
            volume_24h: 770112000
          }
        },
        rank: 4,
        symbol: 'BCH',
        total_supply: 17146025,
        website_slug: 'bitcoin-cash'
      },
      '1958': {
        circulating_supply: 65748111645,
        id: 1958,
        last_updated: 1527209055,
        max_supply: null,
        name: 'TRON',
        quotes: {
          USD: {
            market_cap: 4743772279,
            percent_change_1h: -1.6,
            percent_change_24h: 1.46,
            percent_change_7d: 7.64,
            price: 0.0721507,
            volume_24h: 575169000
          }
        },
        rank: 9,
        symbol: 'TRX',
        total_supply: 100000000000,
        website_slug: 'tron'
      },
      '2': {
        circulating_supply: 56682898,
        id: 2,
        last_updated: 1527209041,
        max_supply: 84000000,
        name: 'Litecoin',
        quotes: {
          USD: {
            market_cap: 6935435997,
            percent_change_1h: -0.42,
            percent_change_24h: 1.67,
            percent_change_7d: -7.8,
            price: 122.355,
            volume_24h: 342392000
          }
        },
        rank: 6,
        symbol: 'LTC',
        total_supply: 56682898,
        website_slug: 'litecoin'
      },
      '2010': {
        circulating_supply: 25927070538,
        id: 2010,
        last_updated: 1527209056,
        max_supply: 45000000000,
        name: 'Cardano',
        quotes: {
          USD: {
            market_cap: 5315334658,
            percent_change_1h: -2.28,
            percent_change_24h: -0.68,
            percent_change_7d: -15.49,
            price: 0.205011,
            volume_24h: 126091000
          }
        },
        rank: 8,
        symbol: 'ADA',
        total_supply: 31112483745,
        website_slug: 'cardano'
      },
      '512': {
        circulating_supply: 18577851493,
        id: 512,
        last_updated: 1527209045,
        max_supply: null,
        name: 'Stellar',
        quotes: {
          USD: {
            market_cap: 5406266252,
            percent_change_1h: -0.85,
            percent_change_24h: 3,
            percent_change_7d: -7.76,
            price: 0.291006,
            volume_24h: 44726000
          }
        },
        rank: 7,
        symbol: 'XLM',
        total_supply: 103966327161,
        website_slug: 'stellar'
      },
      '52': {
        circulating_supply: 39189968239,
        id: 52,
        last_updated: 1527209041,
        max_supply: 100000000000,
        name: 'Ripple',
        quotes: {
          USD: {
            market_cap: 24554200270,
            percent_change_1h: -1,
            percent_change_24h: 3.15,
            percent_change_7d: -6.35,
            price: 0.626543,
            volume_24h: 432385000
          }
        },
        rank: 3,
        symbol: 'XRP',
        total_supply: 99992233977,
        website_slug: 'ripple'
      }
    }];
    const actionRequest = {
      type: FETCH_TOP_TEN_REQUEST,
      isFetching: true
    };

    const actionSuccess = {
      type: FETCH_TOP_TEN_SUCCESS,
      payload: payload,
      isFetching: false
    };

    const actionFailed = {
      type: FETCH_TOP_TEN_FAILED,
      payload: new Error('Network Error'),
      isFetching: false
    };

    it('should fail to fetch top ten', () => {
      mock.onGet(url).networkError();
      return store.dispatch(fetchTopTen()).then(() => {
        expect(store.getActions()).toEqual([actionRequest, actionFailed]);
      });
    });
    it('should successfully fetch top ten', () => {
      mock.onGet(url).reply(200, payload);
      return store.dispatch(fetchTopTen()).then(() => {
        expect(store.getActions()).toEqual([actionRequest, actionSuccess]);
      });
    });
  });

  it('Fetch Coin Data', () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    const payload = [{
      data: {
        '1': {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          website_slug: 'bitcoin',
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
    }];

    const expectedAction = [{
      type: RECEIVE_COIN_DATA,
      payload: payload
    }];

    mock.onGet(url).reply(200, payload);

    return store.dispatch(fetchCoinData()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});