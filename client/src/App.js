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

// dev
const ConstructionOverlay = () => (
    <div style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '1000000'
    }}>
        <h2 style={{
            position: 'absolute',
            left: '50%',
            top: '100px',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            padding: '40px 80px',
            border: '3px solid black',
            borderRadius: '20px',
            backgroundColor: 'whitesmoke',
            opacity: '.5',
            whiteSpace: 'nowrap'
        }}>
            This site is currently under constuction.
            <br />
            It will be ready for you on 29th of November.
            <br />
            We appreciate your visit and will be happy to see you again!
        </h2>
    </div>
);

class App extends Component {
    render() {
        console.log('App renders xox');
        return (
            <BrowserRouter>
                <main>
                    
                    {/* <ConstructionOverlay /> */}

                    <header className="header flex">
                        <nav className="header__nav inline-flex">
                            <NavLink exact to="/">
                                <img
                                    className="header__nav__image"
                                    title="home"
                                    src="/images/181024_Logo_Final_Alpha.png"
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
                    <Route path="/verify" component={Verify} />
                    <Route path="/avira" component={Admin} />
                    <Route
                        path="/profile/:user"
                        render={props => <ProfilePage match={props.match} />}
                    />
                    <Route
                        path="/group/:id"
                        render={props => <GroupPage match={props.match} />}
                    />

                    <footer className="footer flex">
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
                </main>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = ({ signedIn }) => ({ signedIn });

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
