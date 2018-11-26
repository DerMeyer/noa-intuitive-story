import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { acceptCookies } from './actions';

const Cookies = props => (
    <div className="cookies-container inline-flex">
        <div className="cookies-text">
            By using this page you accept its cookies.
        </div>
        <div className="cookies-link cookies-link--accept" onClick={() => props.dispatch(acceptCookies())}>
            ok
        </div>
        <Link to="/impressum" className="cookies-link cookies-link--more">
        Read more...
    </Link>
    </div>
);

const ConnectedCookies = connect(() => {})(Cookies);

export default ConnectedCookies;
