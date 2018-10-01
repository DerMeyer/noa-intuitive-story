import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';

import { getNotes } from './actions';

class IntuitiveNotes extends Component {
    componentDidMount() {
        if (!this.props.groups) {
            this.props.dispatch(getNotes());
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
    notes: state.notes
});

const ConnectedIntuitiveNotes= connect(mapStateToProps)(IntuitiveNotes);

export default ConnectedIntuitiveNotes;
