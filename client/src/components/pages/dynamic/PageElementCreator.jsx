import React, { Component } from 'react';

class PageElementCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: {
                ...this.props.content
            },
            html: ['headline', 'text', 'highlight', 'link outside', 'link inside', 'image', 'video'],
            class: ['default', 'block', 'inline', 'inline-block'],
            color: ['default', 'orange', 'green', 'red', 'blue', 'purple']
        };
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.content || !this.props.content) {
            return;
        }
        if (Object.keys(prevProps.content).some(key => prevProps.content[key] !== this.props.content[key])) {
            this.setState(({ content }) => ({
                content: {
                    ...this.props.content
                }
            }));
        }
    }

    setElement() {
        if (this.timeoutID) {
            window.clearTimeout(this.clearTimeoutID);
        }
        this.timeoutID = window.setTimeout(() => {
            this.props.setPageElement(this.state.content);
        }, 50);
    }

    setHtml = name => {
        this.setState(({ content }) => ({
            content: {
                ...content,
                html: name,
                className: '',
                style: {}
            }
        }));
        this.setElement();
    };

    setClass = name => {
        const className = name !== 'default'
            ? name
            : '';
        this.setState(({ content }) => ({
            content: {
                ...content,
                className
            }
        }));
        this.setElement();
    };

    setColor = name => {
        const style = name !== 'default'
            ? { color: name }
            : {};
        this.setState(({ content }) => ({
            content: {
                ...content,
                style
            }
        }));
        this.setElement();
    };

    getUserInput = (name, value) => {
        this.setState(({ content }) => ({
            content: {
                ...content,
                [name]: value
            }
        }));
        this.setElement();
    };

    render() {
        const { path, addPageElementBefore, deletePageElement, unDeletePageElement, savePage } = this.props;
        const { text, html, className, style, url } = this.state.content;

        return (
            <div className="page-creator">
                <div className="page-creator__path">
                    {path.join(' / ')}
                </div>

                <div className="page-creator__element">
                    <div className="page-creator__headline">
                        Element
                    </div>
                    {Array.isArray(this.state.html) && this.state.html.map((name, index) => (
                        <button
                            key={`html${index}`}
                            className="page-creator__button"
                            style={name === html ? { color: 'whitesmoke', backgroundColor: 'var(--darkColor)' } : {}}
                            onClick={() => this.setHtml(name)}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <div className="page-creator__element">
                    {html !== 'image' && html !== 'video' && (
                        <div>
                            <div className="page-creator__headline">
                                Text
                            </div>
                            <input
                                className="page-creator__input"
                                name="text"
                                placeholder="text"
                                value={text}
                                onChange={event => this.getUserInput(event.target.name, event.target.value)}
                            />
                        </div>
                    )}

                    {html !== 'headline' && html !== 'text' && html !== 'highlight' && html !== 'image' && (
                        <div>
                            <div className="page-creator__headline">
                                {html === 'link inside'
                                    ? 'URL (eg: About, Video)'
                                    : 'URL'
                                }
                            </div>
                            <input
                                className="page-creator__input"
                                name="url"
                                placeholder="url"
                                value={url}
                                onChange={event => this.getUserInput(event.target.name, event.target.value)}
                            />
                        </div>
                    )}
                </div>

                {html !== 'headline' && html !== 'image' && html !== 'video' && (
                    <div className="page-creator__element">
                        <div className="page-creator__headline">
                            Behavior
                        </div>
                        {Array.isArray(this.state.class) && this.state.class.map((name, index) => (
                            <button
                                key={`class${index}`}
                                className="page-creator__button"
                                style={(!className && name === 'default') || (name === className) ? {
                                    color: 'whitesmoke',
                                    backgroundColor: 'var(--darkColor)'
                                } : {}}
                                onClick={() => this.setClass(name)}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                )}

                {html !== 'image' && html !== 'video' && (
                    <div className="page-creator__element">
                        <div className="page-creator__headline">
                            Color
                        </div>
                        {Array.isArray(this.state.color) && this.state.color.map((name, index) => (
                            <button
                                key={`color${index}`}
                                className="page-creator__button"
                                style={(!style.color && name === 'default') || (name === style.color) ? {
                                    color: 'whitesmoke',
                                    backgroundColor: 'var(--darkColor)'
                                } : {}}
                                onClick={() => this.setColor(name)}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                )}

                <div className="page-creator__tools">
                    <button
                        className="page-creator__button"
                        onClick={addPageElementBefore}
                    >
                        Add Before
                    </button>
                    <button
                        className="page-creator__button"
                        onClick={deletePageElement}
                    >
                        Delete
                    </button>
                    <button
                        className="page-creator__button"
                        onClick={unDeletePageElement}
                    >
                        Un-Delete
                    </button>
                    <button
                        style={{ color: 'whitesmoke', backgroundColor: 'red' }}
                        className="page-creator__button"
                        onClick={savePage}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        );
    }
}

export default PageElementCreator;
