import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { checkCookies, checkSignIn, signOut } from '../../js/actions';

class ProfileNavigation extends Component {
    componentDidMount() {
        this.props.dispatch(checkCookies());
        this.props.dispatch(checkSignIn());
    }

    signOut = () => {
        this.props.dispatch(signOut());
        // find a better way to reload app after sign out
        //setTimeout(() => {
        //    window.location.replace('/');
        //}, 1000);
    };

    render() {
        const facebookLink = <a
            href="https://www.facebook.com/theintuitivestory/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                className="profile__nav__icon"
                src="/images/fb-icon.png"
                alt=""
            />
        </a>;
        if (this.props.signedIn) {
            return (
                <nav className="profile__nav inline-flex">
                    {facebookLink}
                    {!this.props.user.verified && (
                        <Link to="/verify" className="profile__nav__button profile__nav__button--border">
                            Verify your account
                        </Link>
                    )}
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
                                backgroundImage: `url(${this.props.user.icon_url || '/default.jpeg'})`
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
                {facebookLink}
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
