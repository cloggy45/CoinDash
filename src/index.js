import React from "react";
import { render } from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./containers/App";

import configureStore from "./store/configureStore";
import rootReducer from "./reducers/rootReducer";

export const store = configureStore({
  api: {
    requesting: false,
    coinData: [],
    coinHistoryData: [],
    marketOverviewData: [],
    tickers: []
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
