export const selected = (
    currentState = {
        selectedCoin: 'DOGE',
        selectedId: 4432,
        selectedCurrency: 'USD'
    },
    action
) => {
    switch (action.type) {
        case 'SELECT_COIN':
            return {
                ...currentState,
                selectedCoin: action.payload,
                selectedId: action.id,
            };
        case 'SELECT_CURRENCY':
            return {
                ...currentState,
                selectedCurrency: action.payload
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

export function selectedCurrency(store) {
    return store.selectedCurrency;
}
