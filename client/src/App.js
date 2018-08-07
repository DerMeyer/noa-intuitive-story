import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

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
            messageStyle: {}
        }
    }
    componentDidMount() {
        this.props.dispatch(checkLogin());
    }
    componentDidUpdate(nextProps) {
        if (!this.currentMessage && this.props.message.text) {
            this.showMessage();
        }
        if (this.props.message.text !== nextProps.message.text) {
            this.setState({
                messageStyle: {
                    color: this.props.message.color,
                    top: this.props.message.text ? '1vh' : '-10vh'
                }
            });
        }
    }
    showMessage() {
        this.currentMessage = true;
        setTimeout(() => {
            this.currentMessage = false;
            this.setState({
                messageStyle: {
                    color: this.props.message.color,
                    top: '-10vh'
                }
            });
            setTimeout(() => {
                this.props.dispatch(deleteMessage());
            }, 1000);
        }, 3500);
    }
    render() {
        return (
            <BrowserRouter>
                <main>
                    <p style={this.state.messageStyle} className="server-greeting">
                        {this.props.message.text || 'No message.'}
                    </p>
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
