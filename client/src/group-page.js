import React, { Component } from 'react';
import { connect } from 'react-redux';
import './page.css';

import Group from './group';

import { getGroups } from './actions';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (!this.props.groups) {
            this.props.dispatch(getGroups());
        } else {
            this.createGroupForRender();
        }
    }
    componentDidUpdate() {
        this.createGroupForRender();
    }
    createGroupForRender = () => {
        if (!this.props.groups || this.state.group) {
            return this.state.group;
        }
        const { name, time_period, gul, grun, vermel, bezrechu, sagol } = this.props.groups[this.props.match.params.id];
        const groupProps = {
            id: this.props.match.params,
            name, time_period, gul, grun, vermel, bezrechu, sagol
        }
        this.setState({
            group: (
                <Group { ...groupProps } />
            )
        });
    }
    render() {
        return (
            <section className="page_container">
                <section className="group-page">
                    <section className="group-preview">
                        {this.state.group}
                    </section>
                    <section className="group-info-container">
                    </section>
                    <section className="group-text-container">
                    </section>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupPage = connect(mapStateToProps)(GroupPage);

export default ConnectedGroupPage;
