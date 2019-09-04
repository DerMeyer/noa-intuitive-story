import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Link, NavLink } from 'react-router-dom';

import '../css/App.css';

import Loading from './partials/Loading';
import ProfileNavigation from './pages/ProfileNavigation';
import Timeline from './pages/Timeline';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import Admin from './pages/Admin';
import ProfilePage from './pages/ProfilePage';
import GroupPage from './pages/GroupPage';
import Impressum from './pages/Impressum';
import Contact from './pages/Contact';
import Cookies from './partials/Cookies';
import Page from './pages/DynamicPage/Page';
import PageEditor from './pages/DynamicPage/PageEditor';
import SubRoutes from './SubRoutes';

// import readyRoutes
import Groups from './pages/ReadyRoutePages/Groups';

// get state before rendering the App
import { getPages, getMenu } from '../js/actions';

export const menuItemTypes = {
    COMPONENT: 'component',
    MENU: 'menu',
    PAGE: 'page'
};

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
        // list readyRoutes
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
        const admin = this.props.verified === 2;
        const { soulsTop, editMode } = this.state;

        const { pages, menu: menuMap } = this.props;
        const stateLoaded = !!pages && !!menuMap;

        const menu = [];
        const routes = [];

        // if state from db loaded this creates the menu and pages, else returns loading page
        if (stateLoaded) {
            const samePaths = (path1, path2) => {
                if (path1.length !== path2.length) {
                    return false;
                }
                let sameRoutesCount = 0;
                path1.forEach((route1, index) => {
                    if (route1 === path2[index]) {
                        sameRoutesCount++;
                    }
                });
                return path1.length === sameRoutesCount;
            };

            const createNavigationFromMap = (menuMap, currentPath = []) => {
                Object.keys(menuMap).forEach(menuItemKey => {
                    const menuItem = menuMap[menuItemKey];
                    const routePath = '/' + menuItemKey
                        .split(' ')
                        .map(word => word.toLowerCase())
                        .join('_');
                    if (currentPath.length === 0) {
                        menu.push(
                            <NavLink key={menuItemKey} to={routePath} className="header__nav__button">
                                {menuItemKey}
                            </NavLink>
                        );
                    }
                    switch (menuItem.type) {
                        case menuItemTypes.COMPONENT:
                            routes.push(this.readyRoutes[menuItemKey]);
                            break;
                        case menuItemTypes.MENU:
                            routes.push(
                                <Route
                                    key={routePath + '_sub_route'}
                                    path={routePath}
                                    render={() => <SubRoutes
                                        editMode={editMode}
                                        rootPath={routePath}
                                        cmsSubMenu={menuItem.menu}
                                        pages={pages.filter(page => page.page_path[0] === menuItemKey) || []}
                                        readyRoutes={this.readyRoutes}
                                    />}
                                />
                            );
                            createNavigationFromMap(menuItem.menu, [...currentPath, menuItemKey]);
                            break;
                        case menuItemTypes.PAGE:
                            const page = pages.filter(page => page.page_path[0] === menuItemKey)[0] || {};
                            routes.push(
                                editMode ? (
                                    <Route
                                        key={routePath + '_editMode'}
                                        path={routePath}
                                        render={() => <PageEditor page={page} />}
                                    />
                                ) : (
                                    <Route
                                        key={routePath}
                                        path={routePath}
                                        render={() => <Page page={page} />}
                                    />
                                )
                            );
                            const page_path = [...currentPath, menuItemKey];
                            if (!pages.some(page => samePaths(page.page_path, page_path))) {
                                pages.push({ page_path });
                            }
                            break;
                        default:
                    }
                });
            };

            createNavigationFromMap(menuMap);

            /*Object.keys(menuMap).forEach(menuItem => {
                const newPage = {};
                const subMenu = menuMap[menuItem].subMenu;
                if (subMenu) {
                    Object.keys(subMenu).forEach(subRoute => {
                        if (subMenu[subRoute].page) {
                            newPage.page_path = [ menuItem, subRoute ];
                            if (!pages.some(page => samePaths(page.page_path, newPage.page_path))) {
                                pages.push(newPage);
                            }
                        }
                    });
                } else {
                    newPage.page_path = [ menuItem ];
                    if (!pages.some(page => samePaths(page.page_path, newPage.page_path))) {
                        pages.push(newPage);
                    }
                }
            });

            Object.keys(menuMap).forEach(pathName => {
                const pathValue = menuMap[pathName];
                const path = '/' + pathName
                    .split(' ')
                    .map(word => word.toLowerCase())
                    .join('_');

                menu.push(
                    <NavLink key={pathName} to={path} className="header__nav__button">
                        {pathName}
                    </NavLink>
                );

                if (pathValue.page) {
                    const page = pages.filter(page => page.page_path[0] === pathName)[0] || {};
                    routes.push(
                        editMode ? (
                            <Route
                                key={path + '_editMode'}
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
                    routes.push(this.readyRoutes[pathName]);
                } else if (pathValue.subMenu) {
                    routes.push(
                        <Route
                            key={path + '_sub_route'}
                            path={path}
                            render={() => <SubRoutes
                                editMode={editMode}
                                rootPath={path}
                                cmsSubMenu={pathValue.subMenu}
                                pages={pages.filter(page => page.page_path[0] === pathName) || []}
                                readyRoutes={this.readyRoutes}
                            />}
                        />
                    );
                }
            });*/
        } else {
            routes.push(
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

                            {menu}
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

                    {routes}

                    {/* <Route exact path="/" component={Timeline} /> */}
                    <Route path="/avira" component={Admin} />
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
                        render={props => <GroupPage match={props.match} />}
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
