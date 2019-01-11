import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import SubMenu from './SubMenu';
import Page from './Page';
import PageEditor from './PageEditor';

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

            if (pathValue.page) {
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
            } else if (pathValue.component) {
                subRoutes.push(
                    readyRoutes[pathName]
                );
            }
        });

        const subMenu = {
            path: rootPath,
            links
        };

        return (
            <section>
                <SubMenu data={subMenu} />

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
