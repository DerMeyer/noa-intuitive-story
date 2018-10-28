import React, { Component } from 'react';

import SubMenu from './SubMenu';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.links = [
            'Video',
            'How the Game works',
            'Purpose and Vision',
            'The five Souls',
            'About Me',
            'Inspirations'
        ];
    }

    render() {
        return (
            <section className="page_container test-class">
                <SubMenu links={this.links} />
                <img
                    className="header__nav__image"
                    title="home"
                    src="/images/181024_Logo_final_Alpha.png"
                    alt="Logo"
                />
                <p>There will soon be videos and text on The Intuitive Story here.</p>
            </section>
        )
    }
}

export default About;
