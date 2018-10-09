import * as fromPriceInfo from './coinPriceInfo';

const COIN_PRICE_INFO = 'COIN_PRICE_INFO';

export const getCoinPriceInfoFetchStatus = store =>
    fromPriceInfo.isFetching(store[COIN_PRICE_INFO]);

export const getCoinPriceInfo = store =>
    fromPriceInfo.currentCoinPriceInfo(store[COIN_PRICE_INFO]);

export const getCoinPriceErrorMessage = store =>
    fromPriceInfo.errorMessage(store[COIN_PRICE_INFO]);

export const getCoinPriceErrorStatus = store =>
    fromPriceInfo.hasError(store[COIN_PRICE_INFO]);
