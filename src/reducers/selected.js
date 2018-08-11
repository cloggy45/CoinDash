export const selected = (currentState = {
    selectedCoin: 'BTC'
}, action) => {
    switch (action.type) {
        case "SELECT_COIN":
            return {
                ...currentState,
                selectedCoin: action.payload
            };
        default:
            return currentState;
    }
};

export function selectedCoin(store) {
    return store.selectedCoin;
}