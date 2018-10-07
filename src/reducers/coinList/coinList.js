const initialState = {
    isFetching: true,
    coinList: null,
};

export const coinList = (currentState = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COIN_LIST_REQUEST':
            return {
                ...currentState,
                isFetching: true,
            };
        case 'FETCH_COIN_LIST_SUCCESS':
            return {
                ...currentState,
                isFetching: false,
                coinList: action.payload,
            };
        default:
            return currentState;
    }
};

export function getCoinList(store) {
    return store.coinList;
}

export function isFetching(store) {
    return store.isFetching;
}
