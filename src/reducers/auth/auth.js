export const auth = (currentState = {
    user: {
        additionalUserInfo: {},
        user: {
            uid: null
        }
    },
    isAuthorised: false,
    isLoading: false,
    error: null,
}, action) => {
    switch (action.type) {
        case "LOGIN_REQUESTED":
            return {
                ...currentState,
                isLoading: true
            }
        case "LOGIN_SUCCESSFUL":
            return {
                ...currentState,
                user: action.payload,
                isAuthorised: true,
                isLoading: false
            };
        case "LOGIN_FAILED":
            return {
                ...currentState,
                error: action.error,
                isAuthorised: false,
                isLoading: false
            };
        case "LOGOUT_SUCCESSFUL":
            return {
                ...currentState,
                user: {
                    additionalUserInfo: {},
                    user: {
                        uid: null
                    }
                },
                isAuthorised: false,
                isLoading: false
            };
        default:
            return currentState;
    }
};

export function userid(store) {
    return store.user.user.uid
}

export function user(store) {
    return store.user.additionalUserInfo;
}

export function loadingStatus(store) {
    return store.isLoading;
}

export function authStatus(store) {
    return store.isAuthorised;
}
