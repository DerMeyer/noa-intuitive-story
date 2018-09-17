import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import reducer from './reducer';

import App from './App';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

const main = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(main, document.getElementById('root'));
