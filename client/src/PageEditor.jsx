import React, { Component } from 'react'

import PageInterpreter from './PageInterpreter';
import PageElementCreator from './PageElementCreator';

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

    createPageElement = () => {
        return {
            key: window.btoa(Math.random()),
            text: 'New Page Element.',
            html: 'h3',
            className: '',
            style: {},
            url: '',
            autoplay: false
        };
    };

    addPageElement = () => {
        this.setState(({ pageContent }) => ({
            focus: pageContent.length,
            pageContent: [
                ...pageContent,
                this.createPageElement()
            ]
        }));
    };

    addPageElementBefore = contentIndex => {
        this.setState(state => {
            console.log(state.pageContent);
            const pageContent = [ ...state.pageContent ];
            pageContent.splice(contentIndex, 0, this.createPageElement());
            return {
                pageContent
            };
        });
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

    deletePageElement = contentIndex => {
        this.setState(({ pageContent }) => ({
            pageContent: pageContent.filter((element, index) => index !== contentIndex)
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
                    <PageElementCreator
                        path={path}
                        content={pageContent[focus]}
                        addPageElementBefore={content => this.addPageElementBefore(focus)}
                        setPageElement={content => this.setPageElement(content, focus)}
                        deletePageElement={content => this.deletePageElement(focus)}
                    />
                )}
                {PageInterpreter.getJSX(pageEditorContent)}
                <button onClick={this.addPageElement}>
                    +
                </button>
            </div>
        );
    }
}

export default PageEditor;
