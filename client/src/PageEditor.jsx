import React, { Component } from 'react'

import Page from './Page';
import PageCreator from './PageCreator';

class PageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: 0,
            path: Array.isArray(this.props.page.page_path)
                ? [ ...this.props.page.page_path ]
                : [],
            pageContent: Array.isArray(this.props.page.page_content)
                ? [ ...this.props.page.page_content ]
                : []
        };
    }

    addPageElement = () => {
        this.setState(({ pageContent }) => ({
            focus: pageContent.length,
            pageContent: [
                ...pageContent,
                {
                    key: window.btoa(Math.random()),
                    text: 'New Page Element.',
                    html: 'h3',
                    className: '',
                    style: {},
                    url: '',
                    autoplay: ''
                }
            ]
        }));
    };

    setPageElement = (content, contentIndex) => {
        this.setState(({ pageContent }) => ({
            pageContent: pageContent.map((element, index) =>
                 index === contentIndex
                    ? content
                    : element
            )
        }));
    };

    setFocus = focus => {
        this.setState({
            focus
        });
    };

    render() {
        const { focus, path, pageContent } = this.state;
        const pageEditorContent = pageContent.map((element, index) => ({
            ...element,
            focus: focus === index,
            setFocus: () => this.setFocus(index)
        }));

        return (
            <div className="page-container">
                {pageContent.length > 0 && (
                    <PageCreator
                        path={path}
                        content={pageContent[focus]}
                        setPageContent={content => this.setPageElement(content, focus)}
                    />
                )}
                <Page pageContent={pageEditorContent} />
                <button onClick={this.addPageElement}>
                    +
                </button>
            </div>
        );
    }
}

export default PageEditor;
