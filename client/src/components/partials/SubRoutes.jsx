import React, { Component } from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import {menuItemTypes} from "./Navigation";

import Page from '../pages/dynamic/Page';
import PageEditor from '../pages/dynamic/PageEditor';

class SubRoutes extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        const { editMode, rootPath, cmsSubMenu, pages, readyRoutes } = this.props;

        const links = [];
        const subRoutes = [];

        Object.keys(cmsSubMenu).forEach(pathName => {
            const pathValue = cmsSubMenu[pathName];
            const path = '/' + pathName
                .split(' ')
                .map(word => word.toLowerCase())
                .join('_');
            const fullPath = rootPath + path;

            links.push({
                link: path,
                name: pathName
            });

            if (pathValue.type === menuItemTypes.PAGE) {
                const page = pages.filter(page => page.page_path[1] === pathName)[0] || {};
                subRoutes.push(
                    editMode ? (
                        <Route
                            key={fullPath + '_editMode'}
                            path={fullPath}
                            render={() => <PageEditor page={page} />}
                        />
                    ) : (
                        <Route
                            key={fullPath}
                            path={fullPath}
                            render={() => <Page page={page} />}
                        />
                    )
                );
            } else if (pathValue.type === menuItemTypes.COMPONENT) {
                subRoutes.push(
                    readyRoutes[pathName]
                );
            }
        });

        return (
            <section>
                <div className="sub-menu">
                    {links.map(item => (
                        <NavLink to={`${rootPath}${item.link}`} className="sub-menu__nav__button" key={item.name}>
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <Route
                    path={rootPath}
                    render={() => window.location.pathname === rootPath && <Redirect to={rootPath + links[0].link} />}
                />

                {subRoutes}
            </section>
        )
    }
}

export default SubRoutes;
