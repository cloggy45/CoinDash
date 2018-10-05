import * as fromCoinMetaInfo from './coinMetaInfo';

const COIN_META_INFO = "COIN_META_INFO";

export const getCoinMetaInfo = store => fromCoinMetaInfo.currentCoinMetaInfo(store[COIN_META_INFO]);

export const getCoinMetaInfoFetchStatus = store => fromCoinMetaInfo.fetchStatus(store[COIN_META_INFO]);
