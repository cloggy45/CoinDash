import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './components/App';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import { history } from './history';
import configureStore from './store/configureStore';

export const store = configureStore();

render(
    <Provider store={store}>
        <Router history={history}>
            <React.StrictMode>
                <ErrorBoundary render={() => <h3>Encountered Error...</h3>}>
                    <App />
                </ErrorBoundary>
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById('root')
);
