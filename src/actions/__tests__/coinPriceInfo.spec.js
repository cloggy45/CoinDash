import {
    FETCH_COIN_PRICE_INFO_SUCCESS,
    FETCH_COIN_PRICE_INFO_REQUEST,
    FETCH_COIN_PRICE_INFO_FAILED,
} from '../actionTypes';

import {
    mock, mockStore
} from '../setupAsyncTests';
import {fetchCoinPriceInfo} from "../coinPriceInfo";

describe('coinPriceInfo actions', () => {
    let store = mockStore({coinPriceInfo: []});
    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    afterAll(() => {
        mock.restore();
    });

    const url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";

    const payload = [
        {
            "RAW": {
                "BTC": {
                    "USD": {
                        "TYPE": "5",
                        "MARKET": "CCCAGG",
                        "FROMSYMBOL": "BTC",
                        "TOSYMBOL": "USD",
                        "FLAGS": "4",
                        "PRICE": 6536.17,
                        "LASTUPDATE": 1538528507,
                        "LASTVOLUME": 0.00283006,
                        "LASTVOLUMETO": 18.417888977,
                        "LASTTRADEID": "51853603",
                        "VOLUMEDAY": 3215.761466090918,
                        "VOLUMEDAYTO": 20943532.48519633,
                        "VOLUME24HOUR": 40674.01844017907,
                        "VOLUME24HOURTO": 267175827.1470528,
                        "OPENDAY": 6525.47,
                        "HIGHDAY": 6537.07,
                        "LOWDAY": 6506.28,
                        "OPEN24HOUR": 6600.16,
                        "HIGH24HOUR": 6613.99,
                        "LOW24HOUR": 6469.65,
                        "LASTMARKET": "Coinbase",
                        "CHANGE24HOUR": -63.98999999999978,
                        "CHANGEPCT24HOUR": -0.9695219509830032,
                        "CHANGEDAY": 10.699999999999818,
                        "CHANGEPCTDAY": 0.16397286325735644,
                        "SUPPLY": 17301625,
                        "MKTCAP": 113086362276.25,
                        "TOTALVOLUME24H": 185286.6614658585,
                        "TOTALVOLUME24HTO": 1212388646.112208
                    }
                }
            },
            "DISPLAY": {
                "BTC": {
                    "USD": {
                        "FROMSYMBOL": "Ƀ",
                        "TOSYMBOL": "$",
                        "MARKET": "CryptoCompare Index",
                        "PRICE": "$ 6,536.17",
                        "LASTUPDATE": "Just now",
                        "LASTVOLUME": "Ƀ 0.002830",
                        "LASTVOLUMETO": "$ 18.42",
                        "LASTTRADEID": "51853603",
                        "VOLUMEDAY": "Ƀ 3,215.76",
                        "VOLUMEDAYTO": "$ 20,943,532.5",
                        "VOLUME24HOUR": "Ƀ 40,674.0",
                        "VOLUME24HOURTO": "$ 267,175,827.1",
                        "OPENDAY": "$ 6,525.47",
                        "HIGHDAY": "$ 6,537.07",
                        "LOWDAY": "$ 6,506.28",
                        "OPEN24HOUR": "$ 6,600.16",
                        "HIGH24HOUR": "$ 6,613.99",
                        "LOW24HOUR": "$ 6,469.65",
                        "LASTMARKET": "Coinbase",
                        "CHANGE24HOUR": "$ -63.99",
                        "CHANGEPCT24HOUR": "-0.97",
                        "CHANGEDAY": "$ 10.70",
                        "CHANGEPCTDAY": "0.16",
                        "SUPPLY": "Ƀ 17,301,625.0",
                        "MKTCAP": "$ 113.09 B",
                        "TOTALVOLUME24H": "Ƀ 185.29 K",
                        "TOTALVOLUME24HTO": "$ 1,212.39 M"
                    }
                }
            }
        }
    ];

    const actionFailed = {
        type: FETCH_COIN_PRICE_INFO_FAILED,
        payload: new Error('Network Error'),
        isFetching: false
    };

    const actionRequest = {
        type: FETCH_COIN_PRICE_INFO_REQUEST,
        isFetching: true
    };

    const actionSuccess = {
        type: FETCH_COIN_PRICE_INFO_SUCCESS,
        payload: payload,
        isFetching: false
    };

    it('should fail to fetch coin price info', () => {
        mock.onGet(url).networkError();
        return store.dispatch(fetchCoinPriceInfo("BTC")).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionFailed]);
        });
    });

    it('should successfully fetch coin price info', () => {
        mock.onGet(url).reply(200, payload);
        return store.dispatch(fetchCoinPriceInfo("BTC")).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionSuccess])
        });
    });

});