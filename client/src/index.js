import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

import reducer from './js/reducer';
import './css/index.css';

import App from './components/App';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const main = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(main, document.getElementById('root'));
