import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllGames extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="page-container">
                All Games
            </section>
        );
    }
}

const mapStateToProps = ({ state }) => ({ state });

const ConnectedAllGames = connect(mapStateToProps)(AllGames);

export default ConnectedAllGames;