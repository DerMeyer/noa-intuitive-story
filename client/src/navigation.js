import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileMenu from './profile-menu';

class Navigation extends Component {
    render() {
        const style = {
            logoP: {
                fontSize: '3vh',
                width: '5vw',
                color: 'gray',
                animation: 'spin 10s linear infinite'
            }
        }
        return (
            <header>
                <section className="logo">
                    <p style={style.logoP}>Intuitive Story</p>
                </section>
                <nav>
                    <img className="button" src="/images/about.png" alt="About the Intuitive Story" />
                    <img className="button" src="/images/groups.png" alt="Group Collection" />
                    <img className="button" src="/images/share.png" alt="Share an intuitive Note" />
                </nav>
                <ProfileMenu />
            </header>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedNavigation = connect(mapStateToProps)(Navigation);

export default ConnectedNavigation;
