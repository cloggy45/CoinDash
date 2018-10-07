import * as fromCoinHistory from './coinHistory';

const COIN_HISTORY = 'COIN_HISTORY';

export function getCoinHistory(store) {
    return fromCoinHistory.getCoinHistory(store[COIN_HISTORY]);
}

export function getLoadingStatus(store) {
    return fromCoinHistory.getLoadingStatus(store[COIN_HISTORY]);
}

export function getError(store) {
    return fromCoinHistory.getError(store[COIN_HISTORY]);
}
