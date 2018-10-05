export const selected = (currentState = {
    selectedCoin: 'BTC'
}, action) => {
    switch (action.type) {
        case "SELECT_COIN":
            return {
                ...currentState,
                selectedCoin: action.payload,
                selectedId: action.id
            };
        default:
            return currentState;
    }
};

export function selectedCoin(store) {
    return store.selectedCoin;
}

export function selectedCoinId(store) {
    return store.selectedId;
}