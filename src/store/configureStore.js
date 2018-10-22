import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(preloadedState) {
    const middleware = [thunkMiddleware];
    let composeEnhancers;
    let enhancer;
    if (process.env.NODE_ENV === 'development') {
        console.log('Development Mode Engaged');
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

        middleware.push(logger);
        enhancer = composeEnhancers(applyMiddleware(...middleware));
    } else {
        console.log('Production Mode Engaged');
        enhancer = applyMiddleware(...middleware);
    }

    const store = createStore(rootReducer, preloadedState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
