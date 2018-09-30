import React, { Component } from 'react';
import './signIn.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from './axios';

import { signIn, deleteMessage } from './actions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Please log in to the Intuitive Story.',
            messageRed: {},
            alias: '',
            aliasRed: {},
            pw: ''
        };
        this.firstInput = React.createRef();
    }

    componentDidMount() {
        this.firstInput.current.focus();
    }

    componentDidUpdate(prevProps) {
        if (this.props.signedIn && this.props.user.verified) {
            window.location.replace('/');
        } else if (this.props.signedIn && !this.props.user.verified) {
            window.location.replace('/verify_account');
        }
    }

    componentWillUnmount() {
        this.props.message.signInText && this.props.dispatch(deleteMessage());
        clearTimeout(this.setTimeoutID);
    }

    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    signIn = event => {
        console.log(this.state.alias, this.state.pw);
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        this.props.message.signInText && this.props.dispatch(deleteMessage());
        this.setState({
            message: 'Please log in to the Intuitive Story.',
            messageRed: {}
        });
        if (this.state.alias && !this.state.aliasRed.color && this.state.pw) {
            const { alias, pw } = this.state;
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(signIn(alias, pw));
            }, 500);
            this.setState({
                message: 'Please wait...'
            });
        } else {
            if (!this.state.alias) {
                this.firstInput.current.blur();
                this.setState({
                    alias: 'Please enter a user name',
                    aliasRed: { color: 'red' }
                });
            }
            if (!this.state.pw) {
                this.setState({
                    message: 'Please enter a password.',
                    messageRed: { color: 'red' }
                });
            }
        }
    };

    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
    };

    forgotPW = () => {
        if (this.state.alias) {
            axios
                .post('/api/get_new_pw', {
                    alias: this.state.alias
                })
                .then(resp => {
                    if (resp.data.success) {
                        this.props.dispatch(deleteMessage());
                        this.setState({
                            message:
                                'We sent a new password to your email address.',
                            messageRed: {}
                        });
                    } else {
                        this.setState({
                            message: 'Something went wrong.',
                            messageRed: { color: 'red' }
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                    this.setState({
                        message: 'No server response.',
                        messageRed: { color: 'red' }
                    });
                });
        } else {
            this.state.alias ||
                this.setState({
                    alias: 'Please enter a user name',
                    aliasRed: { color: 'red' }
                });
        }
    };

    render() {
        return (
            <section className="signIn_component_frame">
                <h1
                    style={
                        this.props.message.signInColor || this.state.messageRed
                    }
                >
                    {this.props.message.signInText || this.state.message}
                </h1>
                <input
                    ref={this.firstInput}
                    style={this.state.aliasRed}
                    name="alias"
                    type="text"
                    value={this.state.alias}
                    placeholder="user name"
                    onFocus={this.emptyField}
                    onChange={this.compileData}
                    onKeyDown={this.signIn}
                />
                <input
                    name="pw"
                    type="password"
                    placeholder="password"
                    onChange={this.compileData}
                    onKeyDown={this.signIn}
                />
                <button onClick={this.signIn}>Log in</button>
                <Link to="/signup">
                    <button>Not a member yet?</button>
                </Link>
                <button onClick={this.forgotPW}>Forgot your password?</button>
            </section>
        );
    }
}

const mapStateToProps = ({ signedIn, message, user = {} }) => ({
    signedIn,
    message,
    user
});

const ConnectedSignIn = connect(mapStateToProps)(SignIn);

export default ConnectedSignIn;
