import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducer';
import './index.css';

import App from './App';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

const main = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(main, document.getElementById('root'));
