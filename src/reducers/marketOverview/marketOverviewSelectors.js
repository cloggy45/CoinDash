import * as fromMarketOverview from './marketOverview';

const MARKET_OVERVIEW = 'MARKET_OVERVIEW';

export function marketOverviewFetchStatus(store) {
    return fromMarketOverview.isFetching(store[MARKET_OVERVIEW]);
}

export function marketOverviewErrorMessage(store) {
    return fromMarketOverview.error(store[MARKET_OVERVIEW]);
}

export function marketOverviewCurrentState(store) {
    return fromMarketOverview.currentMarketOverview(store[MARKET_OVERVIEW]);
}
