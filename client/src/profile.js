import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from './actions';

class Profile extends Component {
    logout = () => {
        this.props.dispatch(logout());
        window.location.replace('/');
    }
    render() {
        if (this.props.loggedIn) {
            return (
                <section className="profile_menu">
                    <div>
                        {this.props.verified
                            ? <Link to={`/profile/${this.props.alias}`} className="router_link"><p>Hello {this.props.alias}!</p></Link>
                            : <Link to="/verify_account" className="router_link"><p>Please confirm...</p></Link>}
                        <p onClick={this.logout}>Log out</p>
                    </div>
                    <Link to={`/profile/${this.props.alias}`} className="profile_image router_link">
                        <img src="images/profile_menu.png" alt="User" />
                    </Link >
                </section >
            )
        } else {
            return (
                <section className="profile_menu">
                    <div>
                        <Link to="/login" className="router_link"><p>Log in</p></Link>
                        <Link to="register" className="router_link"><p>Register</p></Link>
                    </div>
                    <img src="images/profile_menu.png" alt="User" className="profile_image" />
                </section >
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state.user,
    loggedIn: state.loggedIn
});

const ConnectedProfile = connect(mapStateToProps)(Profile);

export default ConnectedProfile;
