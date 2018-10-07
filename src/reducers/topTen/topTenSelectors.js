import * as fromTopTen from './topTen';

const TOP_TEN = 'TOP_TEN';

export function getTopTen(store) {
    return fromTopTen.getTopTen(store[TOP_TEN]);
}

export function getErrorMessage(store) {
    return fromTopTen.getErrorMessage(store[TOP_TEN]);
}

export function isFetchingTopTenList(store) {
    return fromTopTen.isFetchingTopTen(store[TOP_TEN]);
}
