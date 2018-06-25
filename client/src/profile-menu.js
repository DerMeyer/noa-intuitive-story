import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileMenu extends Component {
    render() {
        const style = {
            user: {
                width: '4.5vw'
            }
        }
        return (
            <section className="profile_menu">
                <img style={style.user} src="images/profile_menu.png" alt="User" />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedProfileMenu = connect(mapStateToProps)(ProfileMenu);

export default ConnectedProfileMenu;
