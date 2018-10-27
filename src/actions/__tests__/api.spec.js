import {
    fetchPaginatedCoinList,
    fetchCoinData,
    fetchCoinHistory,
    fetchCoinList,
} from '../api';

import {
    FETCH_TOP_TEN_REQUEST,
    FETCH_TOP_TEN_SUCCESS,
    FETCH_TOP_TEN_FAILED,
    FETCH_COIN_HISTORY_REQUEST,
    FETCH_COIN_HISTORY_SUCCESS,
    FETCH_COIN_HISTORY_FAILED,
    FETCH_COIN_LIST_REQUEST,
    FETCH_COIN_LIST_SUCCESS,
    RECEIVE_COIN_DATA,
} from '../actionTypes';

import { mock, mockStore } from '../setupAsyncTests';

import baseUrl from '../../config';

describe('Test Async Actions', () => {
    let store = mockStore({
        api: [],
    });

    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    afterAll(() => {
        mock.restore();
    });

    it('Fetch coin list', () => {
        const url = `${baseUrl}list`;

        const payload = {
            Data: {
                '42': {
                    Id: '4321',
                    Url: '/coins/42/overview',
                    ImageUrl: '/media/12318415/42.png',
                    Name: '42',
                    Symbol: '42',
                    CoinName: '42 Coin',
                    FullName: '42 Coin (42)',
                    Algorithm: 'Scrypt',
                    ProofType: 'PoW/PoS',
                    FullyPremined: '0',
                    TotalCoinSupply: '42',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '34',
                    Sponsored: false,
                    IsTrading: true,
                },
                '300': {
                    Id: '749869',
                    Url: '/coins/300/overview',
                    ImageUrl: '/media/27010595/300.png',
                    Name: '300',
                    Symbol: '300',
                    CoinName: '300 token',
                    FullName: '300 token (300)',
                    Algorithm: 'N/A',
                    ProofType: 'N/A',
                    FullyPremined: '0',
                    TotalCoinSupply: '300',
                    BuiltOn: '7605',
                    SmartContractAddress:
                        '0xaec98a708810414878c3bcdf46aad31ded4a4557',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '2212',
                    Sponsored: false,
                    IsTrading: true,
                },
                '365': {
                    Id: '33639',
                    Url: '/coins/365/overview',
                    ImageUrl: '/media/352070/365.png',
                    Name: '365',
                    Symbol: '365',
                    CoinName: '365Coin',
                    FullName: '365Coin (365)',
                    Algorithm: 'X11',
                    ProofType: 'PoW/PoS',
                    FullyPremined: '0',
                    TotalCoinSupply: '2300000000',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '916',
                    Sponsored: false,
                    IsTrading: true,
                },
                '404': {
                    Id: '21227',
                    Url: '/coins/404/overview',
                    ImageUrl: '/media/351001/404.png',
                    Name: '404',
                    Symbol: '404',
                    CoinName: '404Coin',
                    FullName: '404Coin (404)',
                    Algorithm: 'Scrypt',
                    ProofType: 'PoW/PoS',
                    FullyPremined: '0',
                    TotalCoinSupply: '532000000',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '602',
                    Sponsored: false,
                    IsTrading: true,
                },
                '611': {
                    Id: '20909',
                    Url: '/coins/611/overview',
                    ImageUrl: '/media/350985/611.png',
                    Name: '611',
                    Symbol: '611',
                    CoinName: 'SixEleven',
                    FullName: 'SixEleven (611)',
                    Algorithm: 'SHA256',
                    ProofType: 'PoW',
                    FullyPremined: '0',
                    TotalCoinSupply: '611000',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '586',
                    Sponsored: false,
                    IsTrading: true,
                },
                '808': {
                    Id: '28223',
                    Url: '/coins/808/overview',
                    ImageUrl: '/media/351513/808.png',
                    Name: '808',
                    Symbol: '808',
                    CoinName: '808',
                    FullName: '808 (808)',
                    Algorithm: 'SHA256',
                    ProofType: 'PoW/PoS',
                    FullyPremined: '0',
                    TotalCoinSupply: 'N/A',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '750',
                    Sponsored: false,
                    IsTrading: true,
                },
                '888': {
                    Id: '29462',
                    Url: '/coins/888/overview',
                    ImageUrl: '/media/351639/888.png',
                    Name: '888',
                    Symbol: '888',
                    CoinName: 'Octocoin',
                    FullName: 'Octocoin (888)',
                    Algorithm: 'N/A',
                    ProofType: 'PoW',
                    FullyPremined: '0',
                    TotalCoinSupply: '135776563',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '811',
                    Sponsored: false,
                    IsTrading: true,
                },
                '1337': {
                    Id: '20824',
                    Url: '/coins/1337/overview',
                    ImageUrl: '/media/350976/1337.png',
                    Name: '1337',
                    Symbol: '1337',
                    CoinName: '1337',
                    FullName: '1337 (1337)',
                    Algorithm: 'X13',
                    ProofType: 'PoW/PoS',
                    FullyPremined: '0',
                    TotalCoinSupply: '314159265359',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '577',
                    Sponsored: false,
                    IsTrading: true,
                },
                BIP: {
                    Id: '925824',
                    Url: '/coins/bip/overview',
                    ImageUrl: '/media/34478541/bip.png',
                    Name: 'BIP',
                    Symbol: 'BIP',
                    CoinName: 'Minter',
                    FullName: 'Minter (BIP)',
                    Algorithm: 'N/A',
                    ProofType: 'DPoS/LPoS',
                    FullyPremined: '0',
                    TotalCoinSupply: '10000000000',
                    BuiltOn: 'N/A',
                    SmartContractAddress: 'N/A',
                    PreMinedValue: 'N/A',
                    TotalCoinsFreeFloat: 'N/A',
                    SortOrder: '3386',
                    Sponsored: false,
                    IsTrading: true,
                },
            },
        };

        const actionRequest = {
            type: FETCH_COIN_LIST_REQUEST,
            isFetching: true,
        };

        const actionSuccess = {
            type: FETCH_COIN_LIST_SUCCESS,
            payload: payload.Data,
            isFetching: false,
        };

        mock.onGet(url).reply(200, payload);
        return store.dispatch(fetchCoinList()).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionSuccess]);
        });
    });

    describe('Fetch history data', () => {
        const url = `${baseUrl}history/BTC/USD`;
        const payload = [
            {
                Response: 'Success',
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
                        volumeto: 663887678.35,
                    },
                    {
                        time: 1525478400,
                        close: 9829.86,
                        high: 9867.73,
                        low: 9687.09,
                        open: 9700.37,
                        volumefrom: 13221.7,
                        volumeto: 129475220.07,
                    },
                ],
                TimeTo: 1525478400,
                TimeFrom: 1525392000,
                FirstValueInArray: true,
                ConversionType: {
                    type: 'direct',
                    conversionSymbol: '',
                },
            },
        ];

        const actionRequest = {
            type: FETCH_COIN_HISTORY_REQUEST,
            isFetching: true,
        };

        const actionSuccess = {
            type: FETCH_COIN_HISTORY_SUCCESS,
            payload: payload,
            isFetching: false,
        };

        const actionFailed = {
            type: FETCH_COIN_HISTORY_FAILED,
            payload: new Error('Network Error'),
            isFetching: false,
        };

        it('should fetch coin history', () => {
            mock.onGet(url).reply(200, payload);
            return store.dispatch(fetchCoinHistory('BTC')).then(() => {
                expect(store.getActions()).toEqual([
                    actionRequest,
                    actionSuccess,
                ]);
            });
        });

        it('should fail to fetch coin history', () => {
            mock.onGet(url).networkError();
            return store.dispatch(fetchCoinHistory('BTC')).then(() => {
                expect(store.getActions()).toEqual([
                    actionRequest,
                    actionFailed,
                ]);
            });
        });
    });

    it('Fetch Coin Data', () => {
        const url = `https://api.coinmarketcap.com/v2/ticker/`;

        const payload = [
            {
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
                                percent_change_7d: 7.64,
                            },
                        },
                        last_updated: 1525489471,
                    },
                },
            },
        ];

        const expectedAction = [
            {
                type: RECEIVE_COIN_DATA,
                payload: payload,
            },
        ];

        mock.onGet(url).reply(200, payload);

        return store.dispatch(fetchCoinData()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });
});
