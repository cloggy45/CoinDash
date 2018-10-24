import * as fromTopTen from './topTen';

const TOP_TEN = 'TOP_TEN';

export function getCoinList(store) {
    return fromTopTen.getCoinListSegment(store[TOP_TEN]);
}

export function getErrorMessage(store) {
    return fromTopTen.getErrorMessage(store[TOP_TEN]);
}

export function isFetchingCoinListSegment(store) {
    return fromTopTen.isFetchingCoinListSegment(store[TOP_TEN]);
}
