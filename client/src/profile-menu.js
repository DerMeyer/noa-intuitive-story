import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileMenu extends Component {
    render() {
        const style = {
            user: {
                width: '4.5vw',
                padding: '.8vw 1vw',
                border: '.1vw solid whitesmoke',
                borderRadius: '.5vw',
                backgroundColor: 'rgb(211, 59, 122)'
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
