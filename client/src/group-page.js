import React, { Component } from 'react';
import { connect } from 'react-redux';
import './group-page.css';

import Group from './group';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(this.props.match.params);
        return (
            <section className="group_component_frame">
                <section className="group_container">
                    <Group />
                </section>
                <section className="info_container">
                    <h1>Everything has and end, only the sausage has two.</h1>
                </section>
                <section className="text_container"></section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupPage = connect(mapStateToProps)(GroupPage);

export default ConnectedGroupPage;
