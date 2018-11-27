import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendContactForm } from './actions';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            subject: '',
            text: ''
        };
        this.firstInput = React.createRef();
    }

    componentDidMount() {
        this.firstInput.current.focus();
    }

    getUserInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    emptyInputField = event => {
        this.setState({
            [event.target.name]: ''
        });
    };

    sendContactForm = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }

        console.log(this.state);

        const { mail, subject, text } = this.state;
        if (mail && subject && text) {
            this.props.dispatch(sendContactForm(mail, subject, text));
        } else {
            console.log('I NEED MORE TEXT');
        }
    }

    render() {
        return (
            <div className="page-container">
                <h3>Contact Form</h3>
                <input
                    ref={this.firstInput}
                    name="mail"
                    type="text"
                    value={this.state.mail}
                    placeholder="your email address"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.sendContactForm}
                />
                <input
                    name="subject"
                    type="text"
                    value={this.state.subject}
                    placeholder="subject"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.sendContactForm}
                />
                <textarea
                    name="text"
                    value={this.state.text}
                    placeholder="enter your message"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                />
                <button onClick={this.sendContactForm}>
                    Send
                </button>
            </div>
        );
    }
}

const ConnectedContact = connect(() => ({}))(Contact);

export default ConnectedContact;
