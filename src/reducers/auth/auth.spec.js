import expect from 'expect';

import {auth} from './auth';

import {
    LOGIN_REQUESTED,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED, LOGOUT_SUCCESSFUL
} from '../../actions/actionTypes';

describe('Auth reducer', () => {
    it('should return initial state', () => {
        expect(auth(undefined, {})).toEqual({
            user: {
                additionalUserInfo: {},
                user: {
                    uid: null
                }
            },
            isAuthorised: false,
            isLoading: false,
            error: null,
        });
    });

    it('should handle LOGIN_REQUESTED', () => {
        expect(auth({}, {
            type: LOGIN_REQUESTED,
            isLoading: true
        })).toEqual({
            isLoading: true
        })
    });

    it('should handle LOGIN_SUCCESSFUL', () => {
        expect(auth({}, {
            type: LOGIN_SUCCESSFUL,
            payload: {
                    additionalUserInfo: {},
                    user: {
                        uid: null
                    }
                },
            isAuthorised: true,
            isLoading: false
        })).toEqual({
            user: {
                additionalUserInfo: {},
                user: {
                    uid: null
                }
            },
            isAuthorised: true,
            isLoading: false
        })
    });

    it('should handle LOGIN_FAILED', () => {
        expect(auth({}, {
            type: LOGIN_FAILED,
            error: "Some Error"
        })).toEqual({
            error: "Some Error",
            isAuthorised: false,
            isLoading: false
        })
    });

    it('should handle LOGOUT_SUCCESSFUL', () => {
        expect(auth({}, {
            type: LOGOUT_SUCCESSFUL,

        })).toEqual({
            user: {
                additionalUserInfo: {},
                user: {
                    uid: null
                }
            },
            isAuthorised: false,
            isLoading: false
        })
    })
});