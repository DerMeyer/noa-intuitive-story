import React, { Component } from 'react';

import PageInterpreter from './PageInterpreter';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageContent: Array.isArray(this.props.page.page_content)
                ? [...this.props.page.page_content]
                : []
        };
    }

    render() {
        const { pageContent } = this.state;
        return (
            <div className="page-container">
                {PageInterpreter.getJSX(pageContent)}
            </div>
        );
    }
}

export default Page;
