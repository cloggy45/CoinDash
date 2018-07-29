import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/rootReducer";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () => {
      const nextRootReducer = require("../reducers/rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
