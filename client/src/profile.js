import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from './actions';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    logout = () => {
        this.props.dispatch(logout());
    }
    render() {
        return (
            <section className="profile_menu" onClick={this.logout}>
                <img src="images/profile_menu.png" alt="User" />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedProfile = connect(mapStateToProps)(Profile);

export default ConnectedProfile;
