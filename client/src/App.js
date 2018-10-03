import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';

import './App.css';

import ProfileNavigation from './ProfileNavigation';
import Timeline from './Timeline';
import About from './About';
import Groups from './Groups';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';
import Admin from './Admin';
import ProfilePage from './ProfilePage';
import GroupPage from './GroupPage';

const App = () => (
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
                    <NavLink to="/timeline" className="header__nav__button">
                        Timeline
                    </NavLink>
                    <NavLink to="/about" className="header__nav__button">
                        About the Intuitive Story
                    </NavLink>
                    <NavLink to="/groups" className="header__nav__button">
                        Group Collection
                    </NavLink>
                </nav>

                <ProfileNavigation />
            </header>

            <Route path="/timeline" component={Timeline} />
            <Route path="/about" component={About} />
            <Route path="/groups" component={Groups} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
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
);

export default App;
