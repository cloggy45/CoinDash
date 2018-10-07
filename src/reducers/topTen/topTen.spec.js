import { topTen } from './topTen';
import * as types from '../../actions/actionTypes';

describe('Fetch Top Ten Reducer', () => {
    it('should return the initial state', () => {
        expect(topTen(undefined, {})).toEqual({
            isFetching: true,
            list: [],
            errorMessage: undefined,
        });
    });

    it('should handle FETCH_TOP_TEN_REQUEST', () => {
        const someAction = {
            type: types.FETCH_TOP_TEN_REQUEST,
            payload: true,
        };

        const expectedResult = {
            isFetching: true,
        };
        expect(topTen({}, someAction)).toEqual(expectedResult);
    });

    it('should handle FETCH_TOP_TEN_SUCCESS', () => {
        const payload = {
            data: {
                '1': {
                    id: 1,
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    website_slug: 'bitcoin',
                    rank: 1,
                    circulating_supply: 17178675.0,
                    total_supply: 17178675.0,
                    max_supply: 21000000.0,
                    quotes: {
                        USD: {
                            price: 8191.35,
                            volume_24h: 4018910000.0,
                            market_cap: 140716539461.0,
                            percent_change_1h: 0.03,
                            percent_change_24h: 0.06,
                            percent_change_7d: 9.56,
                        },
                    },
                    last_updated: 1532888969,
                },
                '1027': {
                    id: 1027,
                    name: 'Ethereum',
                    symbol: 'ETH',
                    website_slug: 'ethereum',
                    rank: 2,
                    circulating_supply: 100996809.0,
                    total_supply: 100996809.0,
                    max_supply: null,
                    quotes: {
                        USD: {
                            price: 465.417,
                            volume_24h: 1570840000.0,
                            market_cap: 47005631825.0,
                            percent_change_1h: 0.11,
                            percent_change_24h: -0.11,
                            percent_change_7d: 0.15,
                        },
                    },
                    last_updated: 1532888988,
                },
                '52': {
                    id: 52,
                    name: 'XRP',
                    symbol: 'XRP',
                    website_slug: 'ripple',
                    rank: 3,
                    circulating_supply: 39315683476.0,
                    total_supply: 99991900487.0,
                    max_supply: 100000000000.0,
                    quotes: {
                        USD: {
                            price: 0.451686,
                            volume_24h: 186483000.0,
                            market_cap: 17758343807.0,
                            percent_change_1h: -0.1,
                            percent_change_24h: -0.27,
                            percent_change_7d: -0.95,
                        },
                    },
                    last_updated: 1532888959,
                },
                '1831': {
                    id: 1831,
                    name: 'Bitcoin Cash',
                    symbol: 'BCH',
                    website_slug: 'bitcoin-cash',
                    rank: 4,
                    circulating_supply: 17264013.0,
                    total_supply: 17264013.0,
                    max_supply: 21000000.0,
                    quotes: {
                        USD: {
                            price: 823.555,
                            volume_24h: 559680000.0,
                            market_cap: 14217863814.0,
                            percent_change_1h: -0.11,
                            percent_change_24h: 0.89,
                            percent_change_7d: 2.55,
                        },
                    },
                    last_updated: 1532888991,
                },
                '1765': {
                    id: 1765,
                    name: 'EOS',
                    symbol: 'EOS',
                    website_slug: 'eos',
                    rank: 5,
                    circulating_supply: 896149492.0,
                    total_supply: 900000000.0,
                    max_supply: 1000000000.0,
                    quotes: {
                        USD: {
                            price: 8.26288,
                            volume_24h: 590631000.0,
                            market_cap: 7404775716.0,
                            percent_change_1h: 0.05,
                            percent_change_24h: -0.27,
                            percent_change_7d: 2.38,
                        },
                    },
                    last_updated: 1532888989,
                },
                '512': {
                    id: 512,
                    name: 'Stellar',
                    symbol: 'XLM',
                    website_slug: 'stellar',
                    rank: 6,
                    circulating_supply: 18767431579.0,
                    total_supply: 104144920420.0,
                    max_supply: null,
                    quotes: {
                        USD: {
                            price: 0.309092,
                            volume_24h: 66584800.0,
                            market_cap: 5800862962.0,
                            percent_change_1h: -0.31,
                            percent_change_24h: -1.8,
                            percent_change_7d: 5.97,
                        },
                    },
                    last_updated: 1532888980,
                },
                '2': {
                    id: 2,
                    name: 'Litecoin',
                    symbol: 'LTC',
                    website_slug: 'litecoin',
                    rank: 7,
                    circulating_supply: 57622832.0,
                    total_supply: 57622832.0,
                    max_supply: 84000000.0,
                    quotes: {
                        USD: {
                            price: 84.0024,
                            volume_24h: 280425000.0,
                            market_cap: 4840456187.0,
                            percent_change_1h: 0.13,
                            percent_change_24h: 0.41,
                            percent_change_7d: 0.42,
                        },
                    },
                    last_updated: 1532888955,
                },
                '2010': {
                    id: 2010,
                    name: 'Cardano',
                    symbol: 'ADA',
                    website_slug: 'cardano',
                    rank: 8,
                    circulating_supply: 25927070538.0,
                    total_supply: 31112483745.0,
                    max_supply: 45000000000.0,
                    quotes: {
                        USD: {
                            price: 0.161944,
                            volume_24h: 45756200.0,
                            market_cap: 4198733511.0,
                            percent_change_1h: -0.21,
                            percent_change_24h: -0.62,
                            percent_change_7d: -6.58,
                        },
                    },
                    last_updated: 1532888992,
                },
                '1720': {
                    id: 1720,
                    name: 'IOTA',
                    symbol: 'MIOTA',
                    website_slug: 'iota',
                    rank: 9,
                    circulating_supply: 2779530283.0,
                    total_supply: 2779530283.0,
                    max_supply: 2779530283.0,
                    quotes: {
                        USD: {
                            price: 1.01366,
                            volume_24h: 33334500.0,
                            market_cap: 2817498667.0,
                            percent_change_1h: -0.19,
                            percent_change_24h: 0.43,
                            percent_change_7d: 2.09,
                        },
                    },
                    last_updated: 1532888988,
                },
                '1958': {
                    id: 1958,
                    name: 'TRON',
                    symbol: 'TRX',
                    website_slug: 'tron',
                    rank: 10,
                    circulating_supply: 65748111645.0,
                    total_supply: 99000000000.0,
                    max_supply: null,
                    quotes: {
                        USD: {
                            price: 0.0395055,
                            volume_24h: 275561000.0,
                            market_cap: 2597412025.0,
                            percent_change_1h: -0.17,
                            percent_change_24h: 8.43,
                            percent_change_7d: 10.48,
                        },
                    },
                    last_updated: 1532888991,
                },
            },
            metadata: {
                timestamp: 1532888585,
                num_cryptocurrencies: 1695,
                error: null,
            },
        };

        const someAction = {
            type: types.FETCH_TOP_TEN_SUCCESS,
            payload: payload,
            isFetching: false,
        };

        const expectedResult = {
            list: Object.entries(payload.data)
                .map(datum => {
                    return datum[1];
                })
                .sort((a, b) => {
                    return a.rank > b.rank;
                }),
            isFetching: false,
        };
        expect(topTen({}, someAction)).toEqual(expectedResult);
    });

    it('should handle FETCH_TOP_TEN_FAILED', () => {
        const someAction = {
            type: types.FETCH_TOP_TEN_FAILED,
            payload: 'error encountered',
            isFetching: false,
        };

        const expectedResult = {
            errorMessage: 'error encountered',
            isFetching: false,
        };
        expect(topTen({}, someAction)).toEqual(expectedResult);
    });
});
