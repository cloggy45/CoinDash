import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger';
import rootReducer from "../reducers/rootReducer";


export default function configureStore(preloadedState) {
  
  const middleware = [thunkMiddleware];
  
  if(process.env.NODE_ENV !== 'production') {
    console.log('Development Mode Engaged');
    middleware.push(logger);
  }
  
  
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
  
  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () => {
      const nextRootReducer = require("../reducers/rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
