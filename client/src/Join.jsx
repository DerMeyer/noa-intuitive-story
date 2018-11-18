import React, { Component } from 'react';

import SubMenu from './SubMenu';

class Join extends Component {
    constructor(props) {
        super(props);
        this.subMenuData = {
            path: 'join',
            links: [
                {
                    link: 'create',
                    name: 'Create a group'
                },
                {
                    link: 'join_group',
                    name: 'Join a group'
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
                <h3 className="try-this-thing">
                    Join a Game and enjoy!
                </h3>
            </section>
        )
    }
}

export default Join;
