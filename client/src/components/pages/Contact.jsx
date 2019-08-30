import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendContactForm } from '../../js/actions';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'We are happy to hear from you',
            messageSent: false,
            mail: '',
            subject: '',
            text: ''
        };
        this.firstInput = React.createRef();
    }

    componentDidMount() {
        this.firstInput.current.focus();
    }

    componentWillUnmount() {
        if (this.timeoutID) {
            window.clearTimeout(this.timeoutID);
        }
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

        const { mail, subject, text } = this.state;
        if (mail && subject && text) {
            this.props.dispatch(sendContactForm(mail, subject, text));
            this.setState({
                messageSent: true
            });
            this.timeoutID = window.setTimeout(() => {
                window.location.replace('/');
            }, 4000);
        } else {
            this.setState({
                message: 'Please fill out every field.'
            });
        }
    }

    render() {
        return this.state.messageSent ? (
            <div className="sign-in-form">
                <h3>Your message is on the way. We'll get back to you soon.</h3>
            </div>
        ) : (
            <div className="sign-in-form">
                <h4>{this.state.message}</h4>
                <input
                    ref={this.firstInput}
                    className="sign-in-form__input"
                    name="mail"
                    type="text"
                    value={this.state.mail}
                    placeholder="your email address"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.sendContactForm}
                />
                <input
                    className="sign-in-form__input"
                    name="subject"
                    type="text"
                    value={this.state.subject}
                    placeholder="subject"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.sendContactForm}
                />
                <textarea
                    className="sign-in-form__textarea"
                    name="text"
                    value={this.state.text}
                    placeholder="your message"
                    onChange={this.getUserInput}
                />
                <button className="sign-in-form__button sign-in-form__button--border" onClick={this.sendContactForm}>
                    Send
                </button>
            </div>
        );
    }
}

const ConnectedContact = connect(() => ({}))(Contact);

export default ConnectedContact;
