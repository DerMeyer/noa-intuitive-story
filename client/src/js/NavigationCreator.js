import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Page from '../components/pages/dynamic/Page';
import PageEditor from '../components/pages/dynamic/PageEditor';
import SubRoutes from '../components/partials/SubRoutes';

// import readyRoutes
import AllGames from '../components/pages/user/AllGames';

export const menuItemTypes = {
    COMPONENT: 'component',
    MENU: 'menu',
    PAGE: 'page'
};

class NavigationCreator  {
    constructor() {
        // list readyRoutes
        this.readyRoutes = {
            'All Games': <Route key="groups-ready-route" path="/all_games" component={AllGames} />
        };
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

    createNavigationFromMap(menuMap, pages, editMode, currentPath = []) {
        const updatedPages = [...pages];
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
                                editMode={editMode}
                                rootPath={routePath}
                                cmsSubMenu={menuItem.menu}
                                pages={updatedPages.filter(page => page.page_path[0] === menuItemKey) || []}
                                readyRoutes={this.readyRoutes}
                            />}
                        />
                    );
                    const {
                        updatedPages: lowerLevelPages,
                        menu: lowerLevelMenu,
                        routes: lowerLevelRoutes,
                        links: lowerLevelLinks
                    } = this.createNavigationFromMap(menuItem.menu, updatedPages, editMode, [...currentPath, menuItemKey]);
                    updatedPages.push(...lowerLevelPages);
                    menu.push(...lowerLevelMenu);
                    routes.push(...lowerLevelRoutes);
                    links.push(...lowerLevelLinks);
                    break;
                case menuItemTypes.PAGE:
                    const page_path = [...currentPath, menuItemKey];
                    if (!updatedPages.some(page => NavigationCreator.compareArrays(page.page_path, page_path))) {
                        updatedPages.push({ page_path });
                    }
                    const page = updatedPages.filter(page => page.page_path[0] === menuItemKey)[0] || {};
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
                    break;
                default:
            }
        });
        return {
            updatedPages,
            menu,
            routes,
            links
        };
    };
}

export default NavigationCreator;
