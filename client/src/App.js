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

import { checkSignIn, signOut } from './actions';

class App extends PureComponent {
    componentDidMount() {
        this.props.dispatch(checkSignIn());
    }

    signOut = () => {
        this.props.dispatch(signOut());
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
                        {this.props.signedIn ? (
                            <nav className="header__profile inline-flex">
                                <Link
                                    to="/"
                                    className="header__profile__button"
                                    onClick={this.signOut}
                                >
                                    Sign out
                                </Link>
                                <Link
                                    to={`/profile/${this.props.user.alias}`}
                                    className="header__profile__button"
                                >
                                    {this.props.user.alias}
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
                        <span className="footer__nav__button">&copy; Noa Golan</span>
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

const mapStateToProps = ({ signedIn, message = {}, user = {} }) => ({
    signedIn,
    message,
    user
});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
