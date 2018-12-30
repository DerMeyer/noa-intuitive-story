import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Link, NavLink } from 'react-router-dom';

import './App.css';

import Loading from './Loading';
import ProfileNavigation from './ProfileNavigation';
import Timeline from './Timeline';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';
import Admin from './Admin';
import ProfilePage from './ProfilePage';
import GroupPage from './GroupPage';
import Impressum from './Impressum';
import Contact from './Contact';
import Cookies from './Cookies';

import Page from './Page';
import PageEditor from './PageEditor';
import SubRoutes from './SubRoutes';

// add to readyRoutes
import Groups from './Groups';

// generally get state before rendering App
import { getPages, getMenu } from './actions';

// put in db
const menuProxy = {

};

// TO DO
// delete unneccessary components like About, Join etc

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCookiesFooter: {}
        };
        this.readyRoutes = {
            'All Games': <Route key="groups-ready-route" path="/all_games" component={Groups} />
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

    positionCookiesOverlay() {
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

        const admin = this.props.verified === 2;
        const { pages, menu } = this.props;
        const stateLoaded = !!pages && !!menu;

        const cmsMenu = [];
        const cmsRoutes = [];

        if (stateLoaded) {
            Object.keys(menu).forEach(pathName => {
                const pathValue = menu[pathName];
                const path = '/' + pathName
                    .split(' ')
                    .map(word => word.toLowerCase())
                    .join('_');

                cmsMenu.push(
                    <NavLink key={pathName} to={path} className="header__nav__button">
                        {pathName}
                    </NavLink>
                );

                if (pathValue.page) {
                    const page = pages.filter(page => page.page_path[0] === pathName)[0] || {};
                    cmsRoutes.push(
                        admin ? (
                            <Route
                                key={path + '_admin'}
                                path={path}
                                render={() => <PageEditor page={page} />}
                            />
                        ) : (
                            <Route
                                key={path}
                                path={path}
                                render={() => <Page page={page} />}
                            />
                        )
                    );
                } else if (pathValue.component) {
                    cmsRoutes.push(
                        this.readyRoutes[pathName]
                    );
                } else if (pathValue.subMenu) {
                    cmsRoutes.push(
                        <Route
                            key={path + '_sub_route'}
                            path={path}
                            render={() => <SubRoutes
                                admin={admin}
                                rootPath={path}
                                cmsSubMenu={pathValue.subMenu}
                                pages={pages.filter(page => page.page_path[0] === pathName) || []}
                                readyRoutes={this.readyRoutes}
                            />}
                        />
                    );
                }
            });
        } else {
            cmsRoutes.push(
                <Loading key="loading" />
            );
        }

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

                            {cmsMenu}
                        </nav>

                        <ProfileNavigation />
                    </header>

                    {cmsRoutes}

                    <Route exact path="/" component={Timeline} />
                    <Route path="/avira" component={Admin} />
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
                        render={props => <GroupPage match={props.match} />}
                    />
                    <Route path="/impressum" component={Impressum} />
                    <Route path="/contact" component={Contact} />

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
