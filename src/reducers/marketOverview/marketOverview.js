const initState = {
    isFetching: true,
    marketOverview: null,
    error: null
};

export const marketOverview = ( currentState = initState, action ) => {
    switch(action.type) {
        case "FETCH_MARKET_OVERVIEW_REQUEST":
            return {
                ...currentState,
                isFetching: true
            };
        case "FETCH_MARKET_OVERVIEW_SUCCESS":
            return {
                ...currentState,
                isFetching: false,
                marketOverview: action.payload
            };

        case "FETCH_MARKET_OVERVIEW_FAILED":
            return {
                ...currentState,
                isFetching: false,
                error: action.payload
            };
        default:
            return currentState;
    }
};

export const isFetching = store => store.isFetching;
export const error = store => store.error;
export const currentMarketOverview = store => store.marketOverview;