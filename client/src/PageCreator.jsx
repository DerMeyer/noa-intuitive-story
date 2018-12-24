import React, { Component } from 'react';

class PageCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.content
        };
    }

    componentDidUpdate(prevProps) {
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
            this.props.setPageContent(this.state);
        }, 500);
    }

    render() {
        const { path } = this.props;
        const { key, text, html, className, style, url } = this.state;

        return (
            <div className="page-creator flex">
                <h3 className="page-creator__path">
                    {path.join(' / ')}
                </h3>
                <input
                    name="text"
                    placeholder="text"
                    value={text}
                    onChange={event => this.getUserInput(event.target.name, event.target.value)}
                />
            </div>
        );
    }
}

export default PageCreator;
