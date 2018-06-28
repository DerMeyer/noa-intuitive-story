import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from './axios';

import { ConnectedNavigation, ProfileMenu, Footer } from './navigation';
import Timeline from './timeline';
import GroupComponent from './group-component';

class App extends Component {
    state = {
        server_message: 'There has been no request.'
    }
    componentDidMount() {
        this.serverSaysHi();
    }
    serverSaysHi = async () => {
        try {
            const response = await axios.get('/api/hello');
            if (response.data.success) {
                this.setState({
                    server_message: response.data.message
                });
            } else {
                this.setState({
                    server_message: 'I could not get the requested data.'
                });
            }
        } catch (err) {
            console.log(err);
            this.setState({
                server_message: 'The server did not respond with a 200.'
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
                    <p className="server_greeting">
                        {this.state.server_message}
                    </p>
                </main>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
