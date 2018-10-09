const initState = {
    isFetching: true,
    coinPriceInfo: null,
    errorMessage: null,
    hasError: false,
};

export const coinPriceInfo = (currentState = initState, action) => {
    switch (action.type) {
        case 'FETCH_COIN_PRICE_INFO_REQUEST':
            return {
                ...currentState,
                isFetching: true,
                hasError: false,
            };
        case 'FETCH_COIN_PRICE_INFO_SUCCESS':
            return {
                ...currentState,
                isFetching: false,
                hasError: false,
                coinPriceInfo: action.payload,
            };
        case 'FETCH_COIN_PRICE_INFO_FAILED':
            return {
                ...currentState,
                isFetching: false,
                errorMessage: action.payload,
                hasError: true,
            };
        default:
            return currentState;
    }
};

export const isFetching = store => store.isFetching;
export const currentCoinPriceInfo = store => store.coinPriceInfo;
export const errorMessage = store => store.errorMessage;
export const hasError = store => store.hasError;
