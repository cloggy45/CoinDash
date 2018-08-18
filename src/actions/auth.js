import {
    FETCH_USER,
    LOGIN_REQUESTED,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    LOGOUT_REQUESTED,
    LOGOUT_SUCCESSFUL
} from './actionTypes';

import {
    authRef,
    provider
} from "../firebase";

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user,
                isAuthorised: true
            });
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null,
                isAuthorised: false
            });
        }
    });
};

export const signIn = () => {
    return dispatch => {
        authRef
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: LOGIN_SUCCESSFUL,
                    payload: result
                })
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_FAILED,
                    error: error,
                    isLoading: false
                })
            });
    }
}

export const signOut = () => {
    return dispatch => {
        authRef
            .signOut()
            .then(() =>
                dispatch({
                    type: LOGOUT_SUCCESSFUL,
                    isAuthorised: false
                })
            );
    }
};