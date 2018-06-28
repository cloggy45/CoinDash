import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/reducers";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  if (module.hot) {
    module.hot.accept("../reducers/reducers", () => {
      const nextRootReducer = require("../reducers/reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
