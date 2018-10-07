import * as fromCoinList from './coinList';

const COIN_LIST = 'COIN_LIST';

export function getCoinList(store) {
    return fromCoinList.getCoinList(store[COIN_LIST]);
}

export function getCoinListFetchStatus(store) {
    return fromCoinList.isFetching(store[COIN_LIST]);
}
