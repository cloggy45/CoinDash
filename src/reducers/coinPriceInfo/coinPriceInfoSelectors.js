import * as fromPriceInfo from './coinPriceInfo';

const COIN_PRICE_INFO = 'COIN_PRICE_INFO';

export const getCoinPriceInfoFetchStatus = store =>
    fromPriceInfo.isFetching(store[COIN_PRICE_INFO]);

export const getCoinPriceInfo = store =>
    fromPriceInfo.currentCoinPriceInfo(store[COIN_PRICE_INFO]);

export const getCoinPriceInfoError = store =>
    fromPriceInfo.error(store[COIN_PRICE_INFO]);
