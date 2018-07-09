import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';

import { getGroups } from './actions';

class GroupCollection extends Component {
    componentDidMount() {
        if (!this.props.groups) {
            this.props.dispatch(getGroups());
        }
    }
    render() {
        return (
            <section className="page_container">
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    user_id: state.user.id,
    groups: state.groups
});

const ConnectedGroupCollection= connect(mapStateToProps)(GroupCollection);

export default ConnectedGroupCollection;
