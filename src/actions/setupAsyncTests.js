import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store/dist/index-umd';
import thunk from 'redux-thunk';

const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);
export const mock = new MockAdapter(axios);
