import React from "react";
import { render } from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./containers/App";

import configureStore from "./store/configureStore";
import rootReducer from "./reducers/reducers";
import { selectCurrency } from "./actions/action";

const store = configureStore();

store.dispatch(selectCurrency("bitcoin"));

console.log(store.getState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
