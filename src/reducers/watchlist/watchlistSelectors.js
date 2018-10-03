import * as fromWatchList from './watchlist';

const WATCHLIST_INFO = 'WATCHLIST_INFO';

export const getWatchListFetchStatus = store => fromWatchList.isFetchingWatchList(store[WATCHLIST_INFO]);
export const getWatchListErrorMessage = store => fromWatchList.errorMessage(store[WATCHLIST_INFO]);
export const getWatchList = store => fromWatchList.userWatchList(store[WATCHLIST_INFO]);