import React from "react";
import { render } from "react-dom";
import axios from "axios";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./containers/App";

import configureStore from "./store/configureStore";
import rootReducer from "./reducers/reducers";
import {
  selectCurrency,
  fetchCoinData,
  receiveTickers
} from "./actions/action";

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
