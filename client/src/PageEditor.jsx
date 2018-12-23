import React, { Component } from 'react'

import PageInterpreter from './PageInterpreter';
import PageCreator from './PageCreator';

class PageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: 0,
            pageContent: [
                {
                    text: 'Hi, I am the first Element.',
                    html: 'h3',
                    className: '',
                    style: {
                        color: 'blue'
                    },
                    url: ''
                }
            ]
        };
    }

    addPageElement = () => {
        this.setState(({ pageContent }) => ({
            focus: pageContent.length,
            pageContent: [
                ...pageContent,
                {
                    text: 'New Page Element.',
                    html: 'h3'
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
        const { focus, pageContent } = this.state;

        return (
            <div className="page-container">
                <PageCreator
                    content={pageContent[focus]}
                    setPageContent={() => this.setPageContent(focus)}
                />
                {this.state.pageContent.map((element, index) => (
                    <PageInterpreter
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
