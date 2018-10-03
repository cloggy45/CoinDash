const initState = {
    isFetching: true,
    list: null,
    errorMessage: undefined
};

export const watchlist = (currentState = initState, action) => {
    switch (action.type) {
        case "FETCH_WATCHLIST_REQUEST":
            return {
                ...currentState,
                isFetching: true
            };
        case "FETCH_WATCHLIST_SUCCESS":
            return {
                ...currentState,
                isFetching: false,
                list: action.payload
            };
        default:
            return currentState;
    }
};

export const isFetchingWatchList = store => store.isFetching;
export const userWatchList = store => store.list;
export const errorMessage = store => store.errorMessage;