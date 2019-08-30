import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../js/axios';

import { signIn, deleteMessage } from '../../js/actions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Sing in to The Intuitive Story.',
            alias: '',
            pw: ''
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
    };

    signIn = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }

        event.preventDefault();
        this.props.message && this.props.dispatch(deleteMessage());

        if (this.state.alias && this.state.pw) {
            const { alias, pw } = this.state;
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(signIn(alias, pw));
            }, 500);
            this.setState({
                message: 'Please wait...'
            });
        } else if (!this.state.alias && !this.state.pw) {
            this.setState({
                message: 'Please enter a user name and password.'
            });
        } else if (this.state.alias && !this.state.pw) {
            this.setState({
                message: 'Please enter a password.'
            });
        } else if (!this.state.alias && this.state.pw) {
            this.setState({
                message: 'Please enter a user name.'
            });
        }
    };

    emptyInputField = event => {
        this.setState({
            [event.target.name]: ''
        });
    };

    getNewPassword = () => {
        if (this.state.alias) {
            this.props.dispatch(deleteMessage());
            const { alias } = this.state;
            axios
                .post('/api/get_new_pw', { alias })
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({
                            message:
                                'We sent a new password to your email address.'
                        });
                    } else {
                        this.setState({
                            message: 'Something went wrong.'
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                    this.setState({
                        message: `The server didn't respond.`
                    });
                });
        } else {
            this.setState({
                message: 'Please enter a user name.'
            });
        }
    };

    render() {
        return (
            <div className="sign-in-form">
                <h1 className="sign-in-form__h1">{this.props.message || this.state.message}</h1>
                <input
                    ref={this.firstInput}
                    className="sign-in-form__input"
                    name="alias"
                    type="text"
                    value={this.state.alias}
                    placeholder="user name"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signIn}
                />
                <input
                    className="sign-in-form__input"
                    name="pw"
                    type="password"
                    placeholder="password"
                    onChange={this.getUserInput}
                    onKeyDown={this.signIn}
                />
                <button className="sign-in-form__button sign-in-form__button--border" onClick={this.signIn}>Sign in</button>
                <Link to="/signup">
                    <button className="sign-in-form__button">Not a member yet?</button>
                </Link>
                <button className="sign-in-form__button" onClick={this.getNewPassword}>Forgot your password?</button>
            </div>
        );
    }
}

const mapStateToProps = ({ message }) => ({ message });

const ConnectedSignIn = connect(mapStateToProps)(SignIn);

export default ConnectedSignIn;
