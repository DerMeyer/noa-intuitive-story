import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Timeline from './Timeline';
import About from './About';
import Groups from './Groups';
import ProfilePage from './ProfilePage';
import GroupPage from './GroupPage';
import Login from './SignIn';
import Register from './SignUp';
import Verify from './Verify';
import Admin from './Admin';

import { checkLogin, logout } from './actions';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(checkLogin());
    }
    logout = () => {
        this.props.dispatch(logout());
        window.location.replace('/');
    };
    render() {
        return (
            <BrowserRouter>
                <main>
                    <header>
                        <nav className="main-navigation inline-flex">
                            <Link to="/" className="main-navigation-button">
                                <img
                                    title="home"
                                    src="favicon.png"
                                    alt="Galaxy Logo"
                                />
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
                                Group Collection
                            </Link>
                        </nav>
                        <nav className="profile-navigation inline-flex column">
                            {this.props.loggedIn ? (
                                <Link
                                    to={`/profile/${this.props.user.alias}`}
                                    className="profile-navigation-button"
                                >
                                    {`Hello ${this.props.user.alias}`}
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="profile-navigation-button"
                                >
                                    Sign in
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
                        <span>&copy; Noa Golan</span>
                        <span onClick={this.logout}>| Log out |</span>
                        <nav className="footer-navigation inline-flex">
                            <Link
                                to="/impressum"
                                className="footer-navigation-button"
                            >
                                Impressum
                            </Link>
                            <Link
                                to="/contact"
                                className="footer-navigation-button"
                            >
                                Contact
                            </Link>
                        </nav>
                    </footer>
                </main>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ loggedIn, user = {} }) => ({
    loggedIn,
    user
});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
