import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Link, NavLink } from 'react-router-dom';

import '../css/App.css';

import Navigation from './partials/Navigation';
import ProfileNavigation from './pages/ProfileNavigation';
import Timeline from './pages/Timeline';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import Admin from './pages/Admin';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage';
import Impressum from './pages/Impressum';
import Contact from './pages/Contact';
import Cookies from './partials/Cookies';


// get state before rendering the App
import { getPages, getMenu } from '../js/actions';
import Routes from './partials/Routes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soulsTop: window.location.pathname === '/'
                ? { top: '150px' }
                : { top: '-150px' },
            editMode: false,
            positionCookiesFooter: {}
        };
    }

    componentDidMount() {
        this.props.dispatch(getPages());
        this.props.dispatch(getMenu());

        window.setTimeout(() => {
            this.positionCookiesOverlay();
        }, 2000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cookies !== this.props.cookies) {
            this.positionCookiesOverlay();
        }
    }

    toggleSouls = visible => {
        this.setState({
            soulsTop: visible
                ? { top: '150px' }
                : { top: '-150px' }
        });
    };

    toggleEditMode = () => {
        this.setState(({ editMode }) => ({ editMode: !editMode }));
    };

    positionCookiesOverlay() {
        if (!this.props.cookies) {
            this.setState({
                positionCookiesFooter: {
                    bottom: '50px'
                }
            });
        } else {
            this.setState({
                positionCookiesFooter: {
                    bottom: '0'
                }
            });
        }
    }

    render() {
        const { soulsTop, editMode } = this.state;
        const { pages, menu: menuMap } = this.props;

        const admin = this.props.verified === 2;

        return (
            <BrowserRouter>
                <main>
                    <header className="header flex">
                        <nav className="header__nav inline-flex">
                            <NavLink exact to="/">
                                <img
                                    className="header__nav__image"
                                    title="home"
                                    src="/images/181031_Logo_new_font_Final_small.png"
                                    alt="Logo"
                                />
                            </NavLink>
                            <Navigation
                                editMode={editMode}
                                menuMap={menuMap}
                                pages={pages}
                            />
                        </nav>
                        {admin && (
                            <div
                                className="admin-edit-mode"
                                style={editMode ? { color: 'whitesmoke', backgroundColor: 'red' } : {}}
                                onClick={this.toggleEditMode}
                            >
                                Edit Mode
                            </div>
                        )}
                        <ProfileNavigation />
                    </header>
                    <div style={soulsTop} className="the-five-souls">
                        <Link to="all_characters/rebel" className="soul-link">
                            <img
                                className="soul-gif"
                                src="/images/victim.gif"
                                alt=""
                            />
                        </Link>
                        <Link to="all_characters/leader" className="soul-link">
                            <img
                                className="soul-gif"
                                src="/images/leader.gif"
                                alt=""
                            />
                        </Link>
                        <Link to="all_characters/romantic" className="soul-link">
                            <img
                                className="soul-gif"
                                src="/images/romantic.gif"
                                alt=""
                            />
                        </Link>
                        <Link to="all_characters/realist" className="soul-link">
                            <img
                                className="soul-gif"
                                src="/images/realist.gif"
                                alt=""
                            />
                        </Link>
                        <Link to="all_characters/messiah" className="soul-link">
                            <img
                                className="soul-gif"
                                src="/images/messiah.gif"
                                alt=""
                            />
                        </Link>
                    </div>
                    <Routes
                        editMode={editMode}
                        menuMap={menuMap}
                        pages={pages}
                    />
                    <Route
                        path="/avira"
                        render={() => <Admin editMode={editMode} />}
                    />
                    <Route
                        exact path="/"
                        render={() => <Timeline toggleSouls={this.toggleSouls} />}
                    />
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
                    <Route
                        path="/profile/:user"
                        render={props => <ProfilePage match={props.match} />}
                    />
                    <Route
                        path="/group/:id"
                        render={props => <GamePage match={props.match} admin={false} />}
                    />
                    <Route path="/impressum" component={Impressum} />
                    <Route path="/contact" component={Contact} />
                    <footer className="footer flex" style={this.state.positionCookiesFooter}>
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

const mapStateToProps = ({
    user,
    cookies,
    signedIn,
    pages,
    menu
}) => ({
    verified: user.verified,
    cookies,
    signedIn,
    pages,
    menu
});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
