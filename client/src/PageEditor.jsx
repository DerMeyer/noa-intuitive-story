import React, { Component } from 'react'

import PageInterpreter from './PageInterpreter';
import PageCreator from './PageCreator';

class PageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: 0,
            path: [ ...this.props.page.page_path ],
            pageContent: [ ...this.props.page.page_content ]
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
                    url: ''
                }
            ]
        }));
    };

    setPageContent = (content, contentIndex) => {
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

        return (
            <div className="page-container">
                {pageContent.length > 0 && (
                    <PageCreator
                        path={path}
                        content={pageContent[focus]}
                        setPageContent={content => this.setPageContent(content, focus)}
                    />
                )}
                {pageContent.map((element, index) => (
                    <PageInterpreter
                        key={element.key}
                        focus={focus === index}
                        setFocus={() => this.setFocus(index)}
                        element={element}
                    />
                ))}
                <button onClick={this.addPageElement}>
                    +
                </button>
            </div>
        );
    }
}

export default PageEditor;
