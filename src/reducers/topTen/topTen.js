import 'core-js/modules/es7.object.entries';

const initState = {
    isFetching: true,
    list: [],
    errorMessage: undefined,
};

export const topTen = (currentState = initState, action) => {
    switch (action.type) {
        case 'FETCH_TOP_TEN_SUCCESS':
            return Object.assign({}, currentState, {
                list: Object.entries(action.payload.data)
                    .map(datum => {
                        return datum[1];
                    })
                    .sort((a, b) => {
                        return a.rank - b.rank;
                    }),
                isFetching: action.isFetching,
            });
        case 'FETCH_TOP_TEN_FAILED':
            return Object.assign({}, currentState, {
                errorMessage: action.payload,
                isFetching: false,
            });
        case 'FETCH_TOP_TEN_REQUEST':
            return Object.assign({}, currentState, {
                isFetching: true,
            });
        default:
            return currentState;
    }
};

export function isFetchingCoinListSegment(store) {
    return store.isFetching;
}

export function getCoinListSegment(store) {
    return store.list;
}

export function getErrorMessage(store) {
    return store.errorMessage;
}
