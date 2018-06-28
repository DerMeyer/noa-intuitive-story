import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from './axios';

import { ConnectedNavigation, ProfileMenu, Footer } from './navigation';
import Timeline from './timeline';
import GroupComponent from './group-component';
import Login from './login';
import Admin from './admin';

class App extends Component {
    state = {
        server_message: 'There has been no request from my side.'
    }
    componentDidMount() {
        this.serverSaysHi();
    }
    serverSaysHi = async () => {
        try {
            const resp = await axios.get('/api/hello');
            if (resp.data.success) {
                this.setState({
                    server_message: resp.data.message
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
                    <Route path="/login" component={Login} />
                    <Route path="/avira" component={Admin} />
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
