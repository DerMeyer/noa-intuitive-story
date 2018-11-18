import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import SubMenu from './SubMenu';
import { JoinCreate, JoinGame } from './JoinPages';

class Join extends Component {
    constructor(props) {
        super(props);
        this.subMenuData = {
            path: 'join',
            links: [
                {
                    link: 'create',
                    name: 'Create a game'
                },
                {
                    link: 'game',
                    name: 'Join a game'
                }
            ]
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <section className="page_container">
                <SubMenu data={this.subMenuData} />

                <Route
                    path="/join"
                    render={() => <Redirect to="/join/create" />}
                />

                <Route path="/join/create" component={JoinCreate} />
                <Route path="/join/game" component={JoinGame} />
            </section>
        )
    }
}

export default Join;
