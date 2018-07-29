const initState = {
  isFetching: true,
  list: [],
  errorMessage: undefined
};

export const topTen = (currentState = initState, action) => {
  switch (action.type) {
    case 'FETCH_TOP_TEN_SUCCESS':
      return Object.assign({}, currentState, {
        list: Object.entries(action.payload.data).map(datum => {
          return datum[1];
        }),
        isFetching: action.isFetching
      });
    case 'FETCH_TOP_TEN_FAILED':
      return Object.assign({}, currentState, {
        errorMessage: action.payload,
        isFetching: action.isFetching
      });
    case 'FETCH_TOP_TEN_REQUEST':
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
  return store.list;
}

export function getErrorMessage(store) {
  return store.errorMessage;
}
