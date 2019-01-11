import React, { Component } from 'react';

class PageElementCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.content
        };
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.content || ! this.props.content) {
            return;
        }
        if (prevProps.content.key !== this.props.content.key) {
            this.setState({
                ...this.props.content
            });
        }
    }

    getUserInput = (name, value) => {
        this.setState({
            [name]: value
        });

        if (this.timeoutID) {
            window.clearTimeout(this.clearTimeoutID);
        }
        this.timeoutID = window.setTimeout(() => {
            this.props.setPageElement(this.state);
        }, 500);
    }

    render() {
        const { path, deletePageElement } = this.props;
        const { key, text, html, className, style, url, autoplay } = this.state;

        return (
            <div className="page-creator">
                <div className="page-creator__path">
                    {path.join(' / ')}
                </div>
                <input
                    className="page-creator__text"
                    name="text"
                    placeholder="text"
                    value={text}
                    onChange={event => this.getUserInput(event.target.name, event.target.value)}
                />
                <button
                    className="page-creator__delete"
                    onClick={deletePageElement}
                >
                    Delete
                </button>
            </div>
        );
    }
}

export default PageElementCreator;
