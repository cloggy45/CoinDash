import {
    FETCH_WATCHLIST_REQUEST,
    FETCH_WATCHLIST_SUCCESS,
} from '../actions/actionTypes';

import { watchListRef } from '../firebase.js';

import { toast } from 'react-toastify';

export const addToWatchList = (coinName, coinId, uid) => {
    return () => {
        watchListRef
            .child(uid)
            .child(coinName)
            .set(coinId)
            .then(() => toast.success(`${coinName} added to watchlist!`))
            .catch(err => toast.error(err));
    };
};
export const removeFromWatchList = (coinName, uid) => {
    return () => {
        watchListRef
            .child(uid)
            .child(coinName)
            .set(null)
            .then(() => toast.success(`${coinName} has been removed`))
            .catch(err => toast.error(err));
    };
};

export const fetchWatchList = uid => {
    return dispatch => {
        dispatch({
            type: FETCH_WATCHLIST_REQUEST,
            isFetching: true,
        });
        watchListRef.child(uid).on('value', snapshot => {
            dispatch({
                type: FETCH_WATCHLIST_SUCCESS,
                payload: snapshot.val(),
            });
        });
    };
};
