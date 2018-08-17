import {combineReducers} from 'redux';
import * as fromApi from './api';
import * as fromTopTen from './topTen/topTen';
import * as fromAuth from './auth/auth';
import * as fromCoinHistory from './coinHistory/coinHistory';
import * as fromSelected from './selected/selected';
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

// API Selectors

export function getTickers(store) {
    return fromApi.getTickers(store[API]);
}

export default rootReducer;
