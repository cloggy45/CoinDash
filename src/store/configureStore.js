import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(preloadedState) {
    const middleware = [thunkMiddleware];
    let composeEnhancers;

    if (process.env.NODE_ENV !== 'production') {
        console.log('Development Mode Engaged');
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;
        middleware.push(logger);
    }

    const enhancer = composeEnhancers(applyMiddleware(...middleware));

    const store = createStore(rootReducer, preloadedState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
