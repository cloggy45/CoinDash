const initialState = {
    isFetching: false,
    error: null,
    coinHistory: null
};


export const coinHistoryReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case "FETCH_COIN_HISTORY_REQUEST":
            return {
                ...currentState,
                isFetching: true
            };
        case "FETCH_COIN_HISTORY_SUCCESS":
            return {
                ...currentState,
                coinHistory: action.payload,
                isFetching: false,
            };
        case "FETCH_COIN_HISTORY_FAILED":
            return {
                ...currentState,
                coinHistory: null,
                error: action.payload,
                isFetching: false
            };
        default:
            return currentState;
    }
};