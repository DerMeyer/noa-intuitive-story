import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteMessage, newVerificationCode, verifyAccount } from '../../../js/actions';

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vCode: '',
            message: 'Please enter the confirmation code we sent to your email address.'
        };
        this.firstInput = React.createRef();
    }

    componentDidMount() {
        this.firstInput.current.focus();
    }

    componentWillUnmount() {
        this.props.message && this.props.dispatch(deleteMessage());
        clearTimeout(this.setTimeoutID);
    }

    getUserInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    verify = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }

        event.preventDefault();
        this.props.message && this.props.dispatch(deleteMessage());

        this.setState({
            message: 'Please enter the confirmation code we sent to your email address.'
        });
        if (this.state.vCode) {
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(verifyAccount(this.props.alias, this.state.vCode));
                // window.location.replace('/');
            }, 500);
        } else {
            this.setState({
                message: `Our mail repeatedly fails to get to you? Please get in touch with our support.`
            });
        }
    }

    newCode = () => {
        this.setTimeoutID = setTimeout(() => {
            this.props.dispatch(newVerificationCode(this.props.alias));
        }, 500);
    }

    render() {
        return (
            <div className="sign-in-form">
                <h1 className="sign-in-form__h1">{this.props.message || this.state.message}</h1>

                <input
                    ref={this.firstInput}
                    className="sign-in-form__input"
                    name="vCode"
                    type="text"
                    value={this.state.vCode}
                    onChange={this.getUserInput}
                    onKeyDown={this.verify}
                />

                <button className="sign-in-form__button sign-in-form__button--border" onClick={this.verify}>
                    Submit
                </button>
                <button className="sign-in-form__button" onClick={this.newCode}>
                    Get a new code
                </button>
                <Link to="/">
                    <button className="sign-in-form__button">
                        Skip this step
                    </button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = ({ message, user = {} }) => ({ message, alias: user.alias });

const ConnectedVerify = connect(mapStateToProps)(Verify);

export default ConnectedVerify;
