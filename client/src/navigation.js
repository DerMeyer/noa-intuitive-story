import React, { Component } from "react";
import "./navigation.css";

import ProfileMenu from './profile-menu';

class Navigation extends Component {
    render() {
        return (
            <section className="nav_frame">
                <section className="logo">
                    <p>Intuitive Story</p>
                </section>
                <section className="site_menu">
                    <img className="site_menu_icon" src="/images/about.png" alt="About the Intuitive Story" />
                    <img className="site_menu_icon" src="/images/groups.png" alt="Group Collection" />
                    <img className="site_menu_icon" src="/images/share.png" alt="Share an intuitive Note" />
                </section>
                <ProfileMenu />
            </section>
        );
    }
}

export default Navigation;
