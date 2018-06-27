import React, { Component } from 'react';
import { connect } from 'react-redux';
import './group-component.css';

class GroupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <section className="group_component_frame">
                <section className="group_container"></section>
                <section className="info_container">
                    <h1>Everything has and end, only the sausage has two.</h1>
                </section>
                <section className="text_container"></section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupComponent = connect(mapStateToProps)(GroupComponent);

export default ConnectedGroupComponent;
