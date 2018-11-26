import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Link, NavLink } from 'react-router-dom';

import './App.css';

import ProfileNavigation from './ProfileNavigation';
import Timeline from './Timeline';
import About from './About';
import Join from './Join';
import Groups from './Groups';
import QandA from './QandA';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';
import Admin from './Admin';
import ProfilePage from './ProfilePage';
import GroupPage from './GroupPage';
import Impressum from './Impressum';

import Cookies from './Cookies';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCookiesFooter: {}
        };
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.placeCookiesOverlay();
        }, 2000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cookies !== this.props.cookies) {
            this.placeCookiesOverlay();
        }
    }

    placeCookiesOverlay() {
        if (!this.props.cookies) {
            this.setState({
                showCookiesFooter: {
                    bottom: '50px'
                }
            });
        } else {
            this.setState({
                showCookiesFooter: {
                    bottom: '0'
                }
            });
        }
    }

    render() {
        console.log('App renders xox', this.props);
        return (
            <BrowserRouter>
                <main>
                    <header className="header flex">
                        <nav className="header__nav inline-flex">
                            <NavLink exact to="/">
                                <img
                                    className="header__nav__image"
                                    title="home"
                                    src="images/181031_Logo_new_Font_Final_small.png"
                                    alt="Logo"
                                />
                            </NavLink>
                            <NavLink to="/about" className="header__nav__button">
                                About
                            </NavLink>
                            <NavLink to="/join" className="header__nav__button">
                                Join the Game
                            </NavLink>
                            <NavLink to="/groups" className="header__nav__button">
                                All Games
                            </NavLink>
                            <NavLink to="/qa" className="header__nav__button">
                                Q & A
                            </NavLink>
                        </nav>

                        <ProfileNavigation />
                    </header>

                    <Route exact path="/" component={Timeline} />
                    <Route path="/about" component={About} />
                    <Route path="/join" component={Join} />
                    <Route path="/groups" component={Groups} />
                    <Route path="/qa" component={QandA} />
                    <Route
                        path="/signin"
                        render={() =>
                            this.props.signedIn ? <Redirect to="/" /> : <SignIn />
                        }
                    />
                    <Route
                        path="/signup"
                        render={() =>
                            this.props.signedIn ? <Redirect to="/" /> : <SignUp />
                        }
                    />
                    <Route
                        path="/verify"
                        render={() =>
                            this.props.verified ? <Redirect to="/" /> : <Verify />
                        }
                    />
                    <Route path="/avira" component={Admin} />
                    <Route
                        path="/profile/:user"
                        render={props => <ProfilePage match={props.match} />}
                    />
                    <Route
                        path="/group/:id"
                        render={props => <GroupPage match={props.match} />}
                    />
                    <Route path="/impressum" component={Impressum} />

                    <footer className="footer flex" style={this.state.showCookiesFooter}>
                        <span className="footer__note">&copy; Noa Golan</span>
                        <nav className="footer__nav inline-flex">
                            <Link to="/impressum" className="footer__nav__button">
                                Impressum
                            </Link>
                            <Link to="/contact" className="footer__nav__button">
                                Contact
                            </Link>
                        </nav>
                    </footer>

                    <Cookies />
                </main>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = ({ cookies, signedIn, user }) => ({ cookies, signedIn, verified: user.verified });

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
