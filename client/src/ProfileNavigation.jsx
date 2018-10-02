import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { checkSignIn, signOut } from './actions';

class ProfileNavigation extends Component {
    componentDidMount() {
        this.props.dispatch(checkSignIn());
    }

    signOut = () => {
        this.props.dispatch(signOut());
        window.location.replace('/');
    };

    render() {
        if (this.props.signedIn) {
            return (
                <nav className="profile__nav inline-flex">
                    <Link
                        to="/"
                        className="profile__nav__button"
                        onClick={this.signOut}
                    >
                        Sign out
                    </Link>
                    <Link
                        to={`/profile/${this.props.user.alias}`}
                        className="profile__nav__button"
                    >
                        <div
                            style={{
                                backgroundImage: `url(${this.props.user.icon_url || 'favicon.png'})`
                            }}
                            className="profile__nav__image"
                            title="view your profile"
                        />
                    </Link>
                </nav>
            );
        }
        return (
            <nav className="profile__nav inline-flex">
                <Link to="/signin" className="profile__nav__button">
                    Sign in
                </Link>
                <Link
                    to="/signup"
                    className="profile__nav__button profile__nav__button--border"
                >
                    Get started
                </Link>
            </nav>
        );
    }
}

const mapStateToProps = ({ signedIn, user = {} }) => ({
    signedIn,
    user
});

const ConnectedProfileNavigation = connect(mapStateToProps)(ProfileNavigation);

export default ConnectedProfileNavigation;
