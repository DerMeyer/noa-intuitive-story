import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import { ConnectedNavigation, ProfileMenu, Footer } from './navigation';
import Timeline from './timeline';
import GroupComponent from './group-component';

class App extends Component {
    state = {
        server_message: ''
    }
    componentDidMount() {
        this.serverSaysHi();
    }
    serverSaysHi = async () => {
        try {
            const response = await fetch('/api/hello');
            const body = await response.json();
            this.setState({
                server_message: body.message
            });
        } catch (err) {
            console.log(err);
            this.setState({
                server_message: 'The server did not respond.'
            });
        }
    }
    render() {
        return (
            <BrowserRouter>
                <main>
                    <Link to="/" className="logo">
                        <img src="images/logo.png" alt="Galaxy Logo"/>
                    </Link>
                    <Route exact path="/" component={ConnectedNavigation} />
                    <Route exact path="/" component={ProfileMenu} />
                    <Route exact path="/" component={Timeline} />
                    <Route path="/group" component={GroupComponent} />
                    <Footer />
                </main>
            </BrowserRouter>
        );
    }
}

// <p className="server_greeting">
//     {this.state.server_message}
// </p>

const mapStateToProps = state => state;

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
