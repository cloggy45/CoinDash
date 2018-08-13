import {combineReducers} from 'redux';
import * as fromApi from './api';
import * as fromTopTen from './topTen';
import * as fromAuth from './auth';
import * as fromCoinHistory from './coinHistory';
import * as fromSelected from './selected';
import * as fromMarketOverview from './marketOverview/marketOverview';

const API = 'API';
const TOP_TEN = 'TOP_TEN';
const AUTH = 'AUTH';
const COIN_HISTORY = 'COIN_HISTORY';
const SELECTED = 'SELECTED';
const MARKET_OVERVIEW = 'MARKET_OVERVIEW';

const rootReducer = combineReducers({
    [AUTH]: fromAuth.auth,
    [API]: fromApi.api,
    [COIN_HISTORY]: fromCoinHistory.coinHistory,
    [TOP_TEN]: fromTopTen.topTen,
    [SELECTED] : fromSelected.selected,
    [MARKET_OVERVIEW] : fromMarketOverview.marketOverview
});


// Selected Selectors

export function getSelectedCoin(store) {
    return fromSelected.selectedCoin(store[SELECTED]);
}

// Coin History Selectors

export function getCoinHistory(store) {
    return fromCoinHistory.getCoinHistory(store[COIN_HISTORY]);
}

export function getLoadingStatus(store) {
    return fromCoinHistory.getLoadingStatus(store[COIN_HISTORY]);
}

export function getError(store) {
    return fromCoinHistory.getError(store[COIN_HISTORY]);
}

// Auth Selectors

export function getUserId(store) {
    return fromAuth.getUserId(store[AUTH]);
}

export function isUserAuthorised(store) {
    return fromAuth.getAuthStatus(store[AUTH]);
}

// API Selectors

export function getTickers(store) {
    return fromApi.getTickers(store[API]);
}

// Top Ten Overview Selectors

export function getTopTen(store) {
    return fromTopTen.getTopTen(store[TOP_TEN]);
}

export function getErrorMessage(store) {
    return fromTopTen.getErrorMessage(store[TOP_TEN]);
}

export function isFetchingTopTenList(store) {
    return fromTopTen.isFetchingTopTen(store[TOP_TEN]);
}

export default rootReducer;