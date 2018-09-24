const intialState = {
  isFetching: false,
  coinMetaInfo: null
};

export const coinMetaInfo = (currentState = intialState, action) => {
    switch (action.type) {
        case "FETCH_COIN_META_INFO_REQUEST":
            return {
                ...currentState,
                isFetching: true
            };
        case "FETCH_COIN_META_INFO_SUCCESS":
            return {
                ...currentState,
                coinMetaInfo: action.payload.Data,
                isFetching: false
            };
        case "FETCH_COIN_META_INFO_FAILED":
            return {
                ...currentState,
                coinMetaInfo: action.payload,
                isFetching: false
            };
        default:
            return currentState;
    }
};
