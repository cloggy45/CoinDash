import {
    FETCH_COIN_PRICE_INFO_SUCCESS,
    FETCH_COIN_PRICE_INFO_REQUEST,
    FETCH_COIN_PRICE_INFO_FAILED,
} from './actionTypes';

import {
    mock, mockStore
} from './setupAsyncTests';
import {fetchCoinPriceInfo} from "./coinPriceInfo";

describe('coinPriceInfo actions', () => {
   let store = mockStore({coinPriceInfo: []});
    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    afterAll(() => {
        mock.restore();
    });

    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

    const payload = [
        {
            "data": {
                "id": 1,
                "name": "Bitcoin",
                "symbol": "BTC",
                "num_market_pairs": 4464,
                "market_pairs": [
                    {
                        "exchange": {
                            "id": 270,
                            "name": "Binance",
                            "slug": "binance"
                        },
                        "market_pair": "BTC/USDT",
                        "market_pair_base": {
                            "currency_id": 1,
                            "currency_symbol": "BTC",
                            "currency_type": "cryptocurrency"
                        },
                        "market_pair_quote": {
                            "currency_id": 825,
                            "currency_symbol": "USDT",
                            "currency_type": "cryptocurrency"
                        },
                        "quote": {
                            "exchange_reported": {
                                "price": 8136.96,
                                "volume_24h_base": 37129.2139432681,
                                "volume_24h_quote": 302118928.687815,
                                "last_updated": "2018-07-31T01:48:09.000Z"
                            },
                            "USD": {
                                "price": 8127.80075640354,
                                "volume_24h": 301778853.172763,
                                "last_updated": "2018-07-31T01:48:09.000Z"
                            }
                        }
                    },
                    {
                        "exchange": {
                            "id": 294,
                            "name": "OKEx",
                            "slug": "okex"
                        },
                        "market_pair": "BTC/USDT",
                        "market_pair_base": {
                            "currency_id": 1,
                            "currency_symbol": "BTC",
                            "currency_type": "cryptocurrency"
                        },
                        "market_pair_quote": {
                            "currency_id": 825,
                            "currency_symbol": "USDT",
                            "currency_type": "cryptocurrency"
                        },
                        "quote": {
                            "exchange_reported": {
                                "price": 8139.9,
                                "volume_24h_base": 30768,
                                "volume_24h_quote": 250448443.2,
                                "last_updated": "2018-07-31T01:48:09.000Z"
                            },
                            "USD": {
                                "price": 8130.73744703786,
                                "volume_24h": 250166529.770461,
                                "last_updated": "2018-07-31T01:48:09.000Z"
                            }
                        }
                    }
                ]
            },
            "status": {
                "timestamp": "2018-06-02T22:51:28.209Z",
                "error_code": 0,
                "error_message": "",
                "elapsed": 10,
                "credit_count": 1
            }
        }
    ]

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
        return store.dispatch(fetchCoinPriceInfo()).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionFailed]);
        });
    });

    it('should successfully fetch coin price info', () => {
        mock.onGet(url).reply(200, payload);
        return store.dispatch(fetchCoinPriceInfo()).then(() => {
            expect(store.getActions()).toEqual([actionRequest,actionSuccess])
        });
    });

});