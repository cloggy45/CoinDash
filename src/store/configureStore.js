import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger';
import rootReducer from "../reducers/rootReducer";


export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, logger)
  );

  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () => {
      const nextRootReducer = require("../reducers/rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
