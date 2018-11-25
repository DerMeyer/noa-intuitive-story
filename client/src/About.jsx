import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import SubMenu from './SubMenu';
import {
    AboutVideo,
    AboutGame,
    AboutVision,
    AboutSouls,
    AboutMe,
    AboutInspirations
} from './AboutPages';

class About extends Component {
    constructor(props) {
        super(props);
        this.subMenuData = {
            path: 'about',
            links: [
                {
                    link: 'video',
                    name: 'Video'
                },
                {
                    link: 'game',
                    name: 'How the Game works'
                },
                {
                    link: 'vision',
                    name: 'Purpose and Vision'
                },
                {
                    link: 'souls',
                    name: 'The five Souls'
                },
                {
                    link: 'me',
                    name: 'About me'
                },
                {
                    link: 'inspirations',
                    name: 'Inspirations'
                }
            ]
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <section className="page-container">
                <SubMenu data={this.subMenuData} />

                <Route
                    path="/about"
                    render={() => window.location.pathname === '/about' && <Redirect to="/about/video" />}
                />

                <Route path="/about/video" component={AboutVideo} />
                <Route path="/about/game" component={AboutGame} />
                <Route path="/about/vision" component={AboutVision} />
                <Route path="/about/souls" component={AboutSouls} />
                <Route path="/about/me" component={AboutMe} />
                <Route path="/about/inspirations" component={AboutInspirations} />
            </section>
        )
    }
}

export default About;
