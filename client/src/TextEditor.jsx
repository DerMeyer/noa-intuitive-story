import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextComponent from './TextComponent';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textComponents: [
                <TextComponent passContent={() => this.getPageContent(0)} />
            ],
            pageContent: [
                {
                    text: 'Hi, I am the headline.',
                    html: 'h3',
                    className: '',
                    style: {
                        color: 'blue'
                    },
                    href: ''
                }
            ]
        };
    }

    addTextComponent = () => {
        this.setState(({ textComponents }) => {
            const contentIndex = textComponents.length;
            return {
                textComponents: [
                    ...textComponents,
                    <TextComponent passContent={() => this.getPageContent(contentIndex)} />
                ]
            };
        });
    };

    getPageContent = (content, contentIndex) => {
        this.setState(({ pageContent }) => ({
            pageContent: pageContent.map((element, index) =>
                 index === contentIndex
                    ? content
                    : element
            )
        }));
    };

    renderPageContent = () => {
        const pageContent = [ ...this.state.pageContent ];
        return pageContent.map(element => {
            const { text, html, className, style, href } = element;
            if (html === 'div') {
                return (
                    <div className={className} style={style}>
                        {text}
                    </div>
                );
            } else if (html === 'h3') {
                return (
                    <h3 className={className} style={style}>
                        {text}
                    </h3>
                );
            } else if (html === 'p') {
                return (
                    <p className={className} style={style}>
                        {text}
                    </p>
                );
            } else if (html === 'a') {
                return (
                    <a className={className} style={style} href={href} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a>
                );
            } else if (html === 'span') {
                return (
                    <span className={className} style={style}>
                        {text}
                    </span>
                );
            } else if (html === 'link') {
                return (
                    <Link className={className} style={style} to={href}>
                        <span>
                            {text}
                        </span>
                    </Link>
                );
            }
            return <div />;
        });
    };

    render() {
        return (
            <div className="page-container">
                {this.state.textComponents}
                <button onClick={this.addTextComponent}>
                    +
                </button>
                {this.renderPageContent()}
            </div>
        );
    }
}

export default TextEditor;
