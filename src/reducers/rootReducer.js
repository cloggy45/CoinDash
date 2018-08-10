import { combineReducers } from 'redux';
import * as fromApi from './api';
import * as fromTopTen from './topTen';
import * as fromAuth from './auth';

import { option } from './option';

const [API, TOP_TEN, OPTION, AUTH] = ['API', 'TOP_TEN', 'OPTION', 'AUTH'];

export const rootReducer = combineReducers({
  [AUTH]: fromAuth.auth,
  [API]: fromApi.api,
  [TOP_TEN]: fromTopTen.topTen,
  [OPTION]: option,
});


export function isUserAuthorised(store) {
  return fromAuth.getAuthStatus(store[AUTH]);
}

export function getTopTen(store) {
  return fromTopTen.getTopTen(store[TOP_TEN]);
}

export function getErrorMessage(store) {
  return fromTopTen.getErrorMessage(store[TOP_TEN]);
}

export function isFetchingTopTenList(store) {
  return fromTopTen.isFetchingTopTen(store[TOP_TEN]);
}

export default rootReducer;
