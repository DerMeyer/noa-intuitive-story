import React, { Component } from 'react';

class PageCreator extends Component {
    generateKey = () => {
        return window.btoa(Math.random());
    };

    render() {
        return (
            <div className="page-creator flex">
                <h3>Page Creator</h3>
            </div>
        );
    }
}

export default PageCreator;
