import {
    FETCH_WATCHLIST_REQUEST,
    FETCH_WATCHLIST_SUCCESS,
} from '../actions/actionTypes';

import { watchListRef } from '../firebase.js';

import { toast } from 'react-toastify';

export const addToWatchList = (coin, uid) => () =>
    watchListRef
        .child(uid)
        .child(coin)
        .set(coin)
        .then(() => toast.success(`${coin} added to watchlist!`))
        .catch(err => toast.error(err));

export const removeFromWatchList = (coin, uid) => {
    return () => {
        watchListRef
            .child(uid)
            .child(coin)
            .set(null);
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
