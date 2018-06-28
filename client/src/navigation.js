import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <header>
                <nav>
                    <img className="button" src="/images/about.png" alt="About the Intuitive Story" />
                    <img className="button" src="/images/groups.png" alt="Group Collection" />
                    <img className="button" src="/images/share.png" alt="Share an intuitive Note" />
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => state.navigation || {};

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

export class ProfileMenu extends Component {
    render() {
        return (
            <section className="profile_menu">
                <img src="images/profile_menu.png" alt="User" />
            </section>
        );
    }
}

const frame = {
    position: 'fixed',
    top: '94vh',
    left: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5vh',
    width: '100vw',
    padding: '0 3vw'
}

const p = {
    cursor: 'pointer',
    position: 'relative',
    fontSize: '2vh',
    marginRight: '2vw',
    color: 'gray',
    zIndex: '75'
}

const div = {
    display: 'flex'
}

export class Footer extends Component {
    render() {
        return (
            <section style={frame}>
                <p style={p}>&copy; Noa Golan</p>
                <div style={div}>
                    <p style={p}>Impressum</p>
                    <p style={p}>Contact</p>
                </div>
            </section>
        );
    }
}
