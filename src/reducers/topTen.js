const initState = {
  isFetching: true,
  topTen: undefined,
  errorMessage: undefined
};

export const topTen = (currentState = initState, action) => {
  switch (action.type) {
    case "FETCH_TOP_TEN_SUCCESS":
      return Object.assign({}, currentState, {
        topTen: action.payload,
        isFetching: action.isFetching
      });
    case "FETCH_TOP_TEN_FAILED":
      return Object.assign({}, currentState, {
        errorMessage: action.payload,
        isFetching: action.isFetching
      });
    case "FETCH_TOP_TEN_REQUEST":
      return Object.assign({}, currentState, {
        isFetching: action.payload
      });
    default:
      return currentState;
  }
};

export function isFetchingTopTen(store) {
  return store.isFetching;
}

export function getTopTen(store) {
  return store.topTen;
}

export function getErrorMessage(store) {
  return store.errorMessage;
}
