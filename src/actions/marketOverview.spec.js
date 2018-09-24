import {
    fetchMarketOverview
} from './marketOverview';

import {
    FETCH_MARKET_OVERVIEW_FAILED,
    FETCH_MARKET_OVERVIEW_REQUEST,
    FETCH_MARKET_OVERVIEW_SUCCESS
} from './actionTypes';

import {
    mock, mockStore
} from './setupAsyncTests'

describe('marketOverview actions', () => {

    let store = mockStore({marketOverview: []});

    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    afterAll(() => {
        mock.restore();
    });

    const url = `https://api.coinmarketcap.com/v2/global/`;
    const payload = [
        {
            "data": {
                "active_cryptocurrencies": 1818,
                "active_markets": 12853,
                "bitcoin_percentage_of_market_cap": 51.06,
                "quotes": {
                    "USD": {
                        "total_market_cap": 214884631416.0,
                        "total_volume_24h": 14881613365.0
                    }
                },
                "last_updated": 1534111051
            },
            "metadata": {
                "timestamp": 1534110586,
                "error": null
            }
        }

    ];

    const actionFailed = {
        type: FETCH_MARKET_OVERVIEW_FAILED,
        payload: new Error('Network Error'),
        isFetching: false
    };

    const actionRequest = {
        type: FETCH_MARKET_OVERVIEW_REQUEST,
        isFetching: true
    };

    const actionSuccess = {
        type: FETCH_MARKET_OVERVIEW_SUCCESS,
        payload: payload,
        isFetching: false
    };

    it('should fail to fetch market overview', () => {
        mock.onGet(url).networkError();
        return store.dispatch(fetchMarketOverview()).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionFailed]);
        })
    });

    it('should successfully fetch market overview', () => {
        mock.onGet(url).reply(200, payload);
        return store.dispatch(fetchMarketOverview()).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionSuccess]);
        })
    });

});