import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout, setMessage } from './actions';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    logout = () => {
        this.props.dispatch(logout());
        window.location.replace('/');
    }
    render() {
        return (
            <section className="profile_menu">
                {this.props.loggedIn
                    ? <div>
                        <Link to="/group"><p>Hello {this.props.alias}!</p></Link>
                        <p onClick={this.logout}>Log out</p>
                    </div>
                    : <div>
                        <Link to="/login"><p>Log in</p></Link>
                        <Link to="register"><p>Register</p></Link>
                    </div>
                }
                <img src="images/profile_menu.png" alt="User" />
            </section>
        );
    }
}

const mapStateToProps = state => ({
    ...state.user,
    loggedIn: state.loggedIn
});

const ConnectedProfile = connect(mapStateToProps)(Profile);

export default ConnectedProfile;
