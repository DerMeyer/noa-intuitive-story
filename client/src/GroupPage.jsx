import React, { Component } from 'react';
import { connect } from 'react-redux';
import './page.css';

import Group from './Group';

import { getGroups } from './actions';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (!this.props.groups) {
            this.props.dispatch(getGroups());
        }
        this.createGroupForRender();
    }
    componentDidUpdate() {
        if (!this.state.group) {
            this.createGroupForRender();
        }
    }
    createGroupForRender = () => {
        if (!this.props.groups) {
            return;
        }
        const currentGroup = this.props.groups.filter(group => group.id === Number(this.props.match.params.id))[0];
        this.setState({
            group: (
                <Group { ...currentGroup } />
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
