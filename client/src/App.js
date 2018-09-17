import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Timeline from './timeline';

import About from './about';
import GroupCollection from './group-collection';
import ProfilePage from './profile-page';
import GroupPage from './group-page';
import Login from './login';
import Register from './register';
import Verify from './verify';
import Admin from './admin';

import { checkLogin, deleteMessage, logout } from './actions';

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
    logout = () => {
        this.props.dispatch(logout());
        window.location.replace('/');
    }
    render() {
        return (
            <BrowserRouter>
                <main>
                    <header>
                        <nav>
                            <Link
                                to="/"
                                className="main-navigation-button"
                            >
                                <img src="favicon.png" alt="Galaxy Logo" />
                            </Link>
                            <Link
                                to="/about"
                                className="main-navigation-button"
                            >
                                About the Intuitive Story
                            </Link>
                            <Link
                                to="/groups"
                                className="main-navigation-button"
                            >
                                The Intuitive Story Groups Collection
                            </Link>
                        </nav>
                        {this.props.loggedIn ? (
                            <div className="profile-menu">
                                {this.props.verified ? (
                                    <Link
                                        to={`/profile/${this.props.alias}`}
                                        className="profile-navigation-button"
                                    >
                                        Hello {this.props.alias}!
                                    </Link>
                                ) : (
                                    <Link
                                        to="/verify"
                                        className="profile-navigation-button"
                                    >
                                        Confirm your account
                                    </Link>
                                )}
                                <p onClick={this.logout}>
                                    Log out
                                </p>
                            </div >
                        ) : (
                            <div className="profile-menu">
                                <Link
                                    to="/login"
                                    className="profile-navigation-button"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="profile-navigation-button"
                                >
                                    Register
                                </Link>
                            </div >
                        )}
                    </header>

                    <p
                        style={this.state.messageStyle}
                        className="message-modal"
                    >
                        {this.props.message.text || 'Welcome to The Intuitive Story.'}
                    </p>

                    <Route exact path="/" component={Timeline} />
                    <Route path="/profile/:user" render={props => (
                            <ProfilePage match={props.match} />
                        )} />
                    <Route path="/about" component={About} />
                    <Route path="/groups" component={GroupCollection} />
                    <Route path="/group/:id" render={props => (
                            <GroupPage match={props.match} />
                        )} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/verify" component={Verify} />
                    <Route path="/avira" component={Admin} />

                    <footer>
                        <p>
                            &copy; Noa Golan
                        </p>
                        <div>
                            <Link
                                to="/about"
                                className="footer-button"
                            >
                                Impressum
                            </Link>
                            <Link
                                to="/groups"
                                className="footer-button"
                            >
                                Contact
                            </Link>
                        </div>
                    </footer>
                </main>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    ...state.user,
    message: state.message,
    loggedIn: state.loggedIn
});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
