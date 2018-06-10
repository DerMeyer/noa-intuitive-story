import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileMenu extends Component {
    render() {
        const style = {
            user: {
                width: '5vh'
            }
        }
        return (
            <section className="profile_menu">
                <img style={style.user} src="https://use.fontawesome.com/releases/v5.0.13/svgs/regular/user.svg" alt="User" />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedProfileMenu = connect(mapStateToProps)(ProfileMenu);

export default ConnectedProfileMenu;
