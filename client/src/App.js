import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Timeline from './timeline';

import About from './about';
import Groups from './group-collection';
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
    }
    componentDidMount() {
        this.props.dispatch(checkLogin());
    }
    componentDidUpdate() {
        if (this.messageIsBeingShown) {
            return;
        }
        if (this.props.message.text) {
            this.showMessage();
        }
    }
    showMessage() {
        this.messageIsBeingShown = true;
        window.setTimeout(() => {
            this.messageIsBeingShown = false;
            this.props.dispatch(deleteMessage());
        }, 3500);
    }
    logout = () => {
        this.props.dispatch(logout());
        window.location.replace('/');
    };
    render() {
        this.message = this.props.loggedIn
            ? `Welcome to The Intuitive Story, ${this.props.alias}.`
            : 'Welcome to The Intuitive Story.';
        return (
            <BrowserRouter>
                <main>
                    <div className="main-background"></div>
                    <header>
                        <nav className="page-menu">
                            <Link to="/" className="main-navigation-button">
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
                        <nav className="profile-menu">
                            <p style={this.props.message.style}>
                                {this.props.message.text || this.message}
                            </p>
                            {this.props.loggedIn ? (
                                <Link
                                    to={`/profile/${this.props.alias}`}
                                    className="profile-navigation-button"
                                >
                                    Hello!
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="profile-navigation-button"
                                >
                                    Log in
                                </Link>
                            )}
                        </nav>
                    </header>

                    <Route exact path="/" component={Timeline} />
                    <Route
                        path="/profile/:user"
                        render={props => <ProfilePage match={props.match} />}
                    />
                    <Route path="/about" component={About} />
                    <Route path="/groups" component={Groups} />
                    <Route
                        path="/group/:id"
                        render={props => <GroupPage match={props.match} />}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/verify" component={Verify} />
                    <Route path="/avira" component={Admin} />

                    <footer>
                        <p>&copy; Noa Golan</p>
                        <p onClick={this.logout}>Log out</p>
                        <div>
                            <Link to="/about" className="footer-button">
                                Impressum
                            </Link>
                            <Link to="/groups" className="footer-button">
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
