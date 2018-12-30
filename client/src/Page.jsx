import React, { Component } from 'react'

import PageInterpreter from './PageInterpreter';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageContent: Array.isArray(this.props.page.page_content)
                ? [ ...this.props.page.page_content ]
                : []
        };
    }

    render() {
        const { pageContent } = this.state;

        const pageForRender = pageContent.length > 0
            ? pageContent.map((element, index) => (
                <PageInterpreter
                    key={element.key}
                    focus={false}
                    setFocus={() => {}}
                    element={element}
                />
            ))
            : <h3>This page is under construction and will soon be ready for you.</h3>;

        return (
            <div className="page-container">
                {pageForRender}
            </div>
        );
    }
}

export default Page;
