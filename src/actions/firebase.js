import {
    FETCH_WATCHLIST_REQUEST,
    FETCH_WATCHLIST_SUCCESS,
} from '../actions/actionTypes';

import { watchListRef } from '../firebase.js';

export const addToWatchList = (coin, uid) => {
    return dispatch => {
        watchListRef
            .child(uid)
            .push()
            .set(coin);
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
