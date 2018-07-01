import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from './axios';

import { ConnectedNavigation, Footer } from './navigation';
import Profile from './profile';
import Timeline from './timeline';
import GroupComponent from './group-component';
import Login from './login';
import Register from './register';
import Admin from './admin';

import { checkLogin } from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server_message: 'There has been no request from my side.'
        }
    }
    componentDidMount() {
        this.props.dispatch(checkLogin());
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
                    <Route exact path="/" component={Profile} />
                    <Route exact path="/" component={Timeline} />
                    <Route path="/group" component={GroupComponent} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/avira" component={Admin} />
                    <Footer />
                    <Link to="/login" className="logo">
                        <p className="server_greeting">
                            {this.state.server_message}
                        </p>
                    </Link>
                </main>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
