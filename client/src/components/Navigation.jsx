import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Link, NavLink } from 'react-router-dom';

import Page from './pages/DynamicPage/Page';
import PageEditor from './pages/DynamicPage/PageEditor';
import SubRoutes from './SubRoutes';

// import readyRoutes
import Groups from './pages/ReadyRoutePages/Groups';

const menuItemTypes = {
    COMPONENT: 'component',
    MENU: 'menu',
    PAGE: 'page'
};

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            routes: []
        };
        // list readyRoutes
        this.readyRoutes = {
            'All Games': <Route key="groups-ready-route" path="/all_games" component={Groups} />
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // compare objects
        const { menu, routes } = this.createNavigationFromMap(this.props.menuMap, this.props.pagesMap);
        this.setState({
            menu,
            routes
        });
    }

    static compareArrays(arr1, arr2) {
        let numIdenticalItems = 0;
        arr1.forEach((item, index) => {
            if (item === arr2[index]) {
                numIdenticalItems++;
            }
        });
        return arr1.length === numIdenticalItems && arr2.length === numIdenticalItems;
    }

    createNavigationFromMap(menuMap, pagesMap, currentPath = []) {
        const updatedPagesMap = {...pagesMap};
        const menu = [];
        const routes = [];
        const links = [];
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
                                editMode={this.props.editMode}
                                rootPath={routePath}
                                cmsSubMenu={menuItem.menu}
                                pages={pages.filter(page => page.page_path[0] === menuItemKey) || []}
                                readyRoutes={this.readyRoutes}
                            />}
                        />
                    );
                    this.createNavigationFromMap(menuItem.menu, [...currentPath, menuItemKey]);
                    break;
                case menuItemTypes.PAGE:
                    const page = pages.filter(page => page.page_path[0] === menuItemKey)[0] || {};
                    routes.push(
                        this.props.editMode ? (
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
                    if (!pages.some(page => Navigation.compareArrays(page.page_path, page_path))) {
                        pages.push({ page_path });
                    }
                    break;
                default:
            }
        });
    };

    render() {
        const { menu, routes } = this.state;
        return (
            <div>
                {menu}
                {routes}
            </div>
        );
    }
}

export default Navigation;
