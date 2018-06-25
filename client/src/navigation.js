import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const ConnectedNavigation = connect(mapStateToProps)(Navigation);

export default ConnectedNavigation;
