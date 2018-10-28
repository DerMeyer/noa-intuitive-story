import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sub-menu">
                {this.props.links.map(link => (
                    <Link to={`/${link}`} className="sub-menu__nav__button">
                        {link}
                    </Link>
                ))}
            </div>
        )
    }
}

export default SubMenu;
