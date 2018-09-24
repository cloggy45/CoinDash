import { fetchCoinMetaInfo  } from './coinMetaInfo';

import {
    FETCH_COIN_META_INFO_FAILED,
    FETCH_COIN_META_INFO_REQUEST,
    FETCH_COIN_META_INFO_SUCCESS
} from './actionTypes';

import {
    mock, mockStore
} from './setupAsyncTests';

describe('coinOverview actions', () => {
    let store = mockStore({coinOverview: []});

    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    afterAll(() => {
        mock.restore();
    });

    const url = "https://pro-api.coinmarketcap.com";
    const payload = [
        {
            "data": {
                "BTC": {
                    "id": 1,
                    "name": "Bitcoin",
                    "symbol": "BTC",
                    "category": "coin",
                    "slug": "bitcoin",
                    "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
                    "tags": [
                        "mineable"
                    ],
                    "urls": {
                        "website": [
                            "https://bitcoin.org/"
                        ],
                        "explorer": [
                            "https://blockchain.info/",
                            "https://live.blockcypher.com/btc/",
                            "https://blockchair.com/bitcoin/blocks"
                        ],
                        "source_code": [
                            "https://github.com/bitcoin/"
                        ],
                        "message_board": [
                            "https://bitcointalk.org"
                        ],
                        "chat": [ ],
                        "announcement": [ ],
                        "reddit": [
                            "https://reddit.com/r/bitcoin"
                        ],
                        "twitter": [
                            "https://twitter.com/Bitcoin"
                        ]
                    }
                }
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
        type: FETCH_COIN_META_INFO_FAILED,
        payload: new Error('Network Error'),
        isFetching: false
    };

    const actionRequest = {
        type: FETCH_COIN_META_INFO_REQUEST,
        isFetching: true
    };

    const actionSuccess = {
        type: FETCH_COIN_META_INFO_SUCCESS,
        payload: payload,
        isFetching: false
    };

    it('should fail to fetch coin meta info', () => {
        mock.onGet(url).networkError();
        return store.dispatch(fetchCoinMetaInfo()).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionFailed]);
        });
    });

    it('should successfully fetch coin meta info', () => {
        mock.onGet(url).reply(200, payload);
        return store.dispatch(fetchCoinMetaInfo()).then(() => {
           expect(store.getActions()).toEqual([actionRequest,actionSuccess])
        });
    });

});

