import * as fromMarketOverview from './marketOverview';

const MARKET_OVERVIEW = 'MARKET_OVERVIEW';

export function fetchStatus (store) {
    return fromMarketOverview.isFetching(store[MARKET_OVERVIEW]);
}

export function getErrorMessage (store) {
    return fromMarketOverview.error(store[MARKET_OVERVIEW]);
}

export function getMarketOverview (store) {
    return fromMarketOverview.currentMarketOverview(store[MARKET_OVERVIEW]);
}