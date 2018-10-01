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
                            <nav className="profile__nav inline-flex">
                                <Link
                                    to="/"
                                    className="profile__nav__button"
                                    onClick={this.signOut}
                                >
                                    Sign out
                                </Link>
                                <Link
                                    to={`/profile/${this.props.user.alias}`}
                                    className="profile__nav__button"
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${this.props.user.icon_url || 'favicon.png'})`
                                        }}
                                        className="profile__nav__image"
                                        title="view your profile"
                                    />
                                </Link>
                            </nav>
                        ) : (
                            <nav className="profile__nav inline-flex">
                                <Link
                                    to="/signin"
                                    className="profile__nav__button"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="profile__nav__button profile__nav__button--border"
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
                        <span className="footer__note">&copy; Noa Golan</span>
                        <nav className="footer__nav inline-flex">
                            <Link
                                to="/impressum"
                                className="footer__nav__button"
                            >
                                Impressum
                            </Link>
                            <Link to="/contact" className="footer__nav__button">
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
