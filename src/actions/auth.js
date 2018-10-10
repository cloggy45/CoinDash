import {
    FETCH_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    LOGOUT_SUCCESSFUL,
} from './actionTypes';

import { authRef, provider } from '../firebase';
import { toast } from 'react-toastify';

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user,
                isAuthorised: true,
            });
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null,
                isAuthorised: false,
            });
        }
    });
};

export const signIn = () => {
    return dispatch => {
        authRef
            .signInWithPopup(provider)
            .then(result => {
                toast.success('Logged in successfully');
                dispatch({
                    type: LOGIN_SUCCESSFUL,
                    payload: result,
                });
            })
            .catch(error => {
                toast.error('Failed to login');
                dispatch({
                    type: LOGIN_FAILED,
                    error: error,
                    isLoading: false,
                });
            });
    };
};

export const signOut = () => {
    return dispatch => {
        authRef.signOut().then(() => {
            toast.info('Logged out successfully');
            dispatch({
                type: LOGOUT_SUCCESSFUL,
                isAuthorised: false,
            });
        });
    };
};
