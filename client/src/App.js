import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from './axios';

import Timeline from './timeline';
import { ConnectedNavigation, Footer } from './navigation';
import Profile from './profile';
import About from './about';
import GroupCollection from './group-collection';
import ProfilePage from './profile-page';
import GroupPage from './group-page';
import Login from './login';
import Register from './register';
import Verify from './verify';
import Admin from './admin';

import { checkLogin, deleteMessage } from './actions';

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
    componentDidUpdate() {
        if (!this.currentMessage && this.props.message.text) {
            this.showMessage();
        }
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
    showMessage() {
        this.currentMessage = true;
        setTimeout(() => {
            this.currentMessage = false;
            this.props.dispatch(deleteMessage());
        }, 4000);
    }
    render() {
        return (
            <BrowserRouter>
                <main>
                    <Link to="/" className="logo">
                        <img src="/images/logo.png" alt="Galaxy Logo"/>
                    </Link>
                    <Route exact path="/" component={Timeline} />
                    <Route exact path="/" component={ConnectedNavigation} />
                    <Route exact path="/" component={Profile} />
                    <Route path="/profile/:user" render={props => (
                            <ProfilePage match={props.match} />
                        )} />
                    <Route path="/about" component={About} />
                    <Route path="/group_collection" component={GroupCollection} />
                    <Route path="/group/:id" render={props => (
                            <GroupPage match={props.match} />
                        )} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/verify_account" component={Verify} />
                    <Route path="/avira" component={Admin} />
                    <Footer />
                    <p style={this.props.message.color} className="server_greeting">
                        {this.props.message.text || this.state.server_message}
                    </p>
                </main>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    message: state.message,
    loggedIn: state.loggedIn
});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
