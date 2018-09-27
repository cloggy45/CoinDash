const initState = {
    isFetching: true,
    coinPriceInfo: null,
    error: null
};

export const coinPriceInfo = (currentState = initState, action) => {
    switch(action.type) {
        case "FETCH_COIN_PRICE_INFO_REQUEST":
            return {
                ...currentState,
                isFetching: true
            };
        case "FETCH_COIN_PRICE_INFO_SUCCESS":
            return {
                ...currentState,
                isFetching: false,
                coinPriceInfo: action.payload
            };
        case "FETCH_COIN_PRICE_INFO_FAILED":
            return {
                ...currentState,
                isFetching: false,
                error: action.payload
            };
        default:
            return currentState;
    }
};