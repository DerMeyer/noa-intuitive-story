import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SubMenu extends Component {
    render() {
        const { path, links } = this.props.data;

        return (
            <div className="sub-menu">
                {links.map(item => (
                    <NavLink to={`${path}${item.link}`} className="sub-menu__nav__button" key={item.name}>
                        {item.name}
                    </NavLink>
                ))}
            </div>
        )
    }
}

export default SubMenu;
