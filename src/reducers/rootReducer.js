import { combineReducers } from 'redux';
import * as fromApi from './api';
import * as fromTopTen from './topTen/topTen';
import * as fromAuth from './auth/auth';
import * as fromSelected from './selected/selected';
import * as fromMarketOverview from './marketOverview/marketOverview';

import * as fromCoinHistory from './coinHistory/coinHistory';
import * as fromCoinPriceInfo from './coinPriceInfo/coinPriceInfo';
import * as fromCoinMetaInfo from './coinMetaInfo/coinMetaInfo';
import * as fromWatchList from './watchlist/watchlist';

const API = 'API';
const TOP_TEN = 'TOP_TEN';
const AUTH = 'AUTH';
const COIN_HISTORY = 'COIN_HISTORY';
const SELECTED = 'SELECTED';
const MARKET_OVERVIEW = 'MARKET_OVERVIEW';
const COIN_META_INFO = 'COIN_META_INFO';
const COIN_PRICE_INFO = 'COIN_PRICE_INFO';
const WATCHLIST_INFO = 'WATCHLIST_INFO';

const rootReducer = combineReducers({
    [AUTH]: fromAuth.auth,
    [API]: fromApi.api,
    [TOP_TEN]: fromTopTen.topTen,
    [SELECTED]: fromSelected.selected,
    [MARKET_OVERVIEW]: fromMarketOverview.marketOverview,
    [COIN_HISTORY]: fromCoinHistory.coinHistory,
    [COIN_PRICE_INFO]: fromCoinPriceInfo.coinPriceInfo,
    [COIN_META_INFO]: fromCoinMetaInfo.coinMetaInfo,
    [WATCHLIST_INFO]: fromWatchList.watchlist,
});

// Selected Selectors

export function getSelectedCoin(store) {
    return fromSelected.selectedCoin(store[SELECTED]);
}

export function getSelectedCoinId(store) {
    return fromSelected.selectedCoinId(store[SELECTED]);
}

// API Selectors

export function getTickers(store) {
    return fromApi.getTickers(store[API]);
}

export function getCoinList(store) {
    return fromApi.getCoinList(store[API]);
}

export default rootReducer;
