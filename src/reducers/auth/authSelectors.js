import * as fromAuth from './auth';

const AUTH = 'AUTH';

export function getUserID(store) {
    return fromAuth.userid(store[AUTH]);
}

export function getUserProfile(store) {
    return fromAuth.user(store[AUTH]);
}

export function getLoadingStatus(store) {
    return fromAuth.loadingStatus(store[AUTH]);
}
export function getAuthStatus(store) {
    return fromAuth.authStatus(store[AUTH]);
}
