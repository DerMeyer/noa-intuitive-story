import React, { PureComponent } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';

import Timeline from './Timeline';
import About from './About';
import Groups from './Groups';
import ProfilePage from './ProfilePage';
import GroupPage from './GroupPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';
import Admin from './Admin';

import { checkLogin, logout } from './actions';

class App extends PureComponent {
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
                    <header className="header flex">
                        <nav className="header__nav inline-flex">
                            <img
                                className="header__nav__image"
                                title="home"
                                src="favicon.png"
                                alt="Logo"
                            />
                            <NavLink
                                exact
                                to="/"
                                className="header__nav__button"
                            >
                                Timeline
                            </NavLink>
                            <NavLink
                                to="/about"
                                className="header__nav__button"
                            >
                                About the Intuitive Story
                            </NavLink>
                            <NavLink
                                to="/groups"
                                className="header__nav__button"
                            >
                                Group Collection
                            </NavLink>
                        </nav>
                        {this.props.loggedIn ? (
                            <nav className="header__profile inline-flex">
                                <Link
                                    to={`/profile/${this.props.user.alias}`}
                                    className="header__profile__button"
                                >
                                    {`Hello ${this.props.user.alias}`}
                                </Link>
                            </nav>
                        ) : (
                            <nav className="header__profile inline-flex">
                                <Link
                                    to="/signin"
                                    className="header__profile__button"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="header__profile__button"
                                >
                                    Get started
                                </Link>
                            </nav>
                        )}
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
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/verify" component={Verify} />
                    <Route path="/avira" component={Admin} />

                    <footer className="footer flex">
                        <span>&copy; Noa Golan</span>
                        <span
                            style={{ color: 'lightgrey' }}
                            onClick={this.logout}
                        >
                            | Log out |
                        </span>
                        <nav className="footer__nav inline-flex">
                            <Link
                                to="/impressum"
                                className="footer__nav__button"
                            >
                                Impressum
                            </Link>
                            <Link
                                to="/contact"
                                className="footer__nav__button"
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
