import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from './axios';

import { login, deleteMessage } from './actions';

class Login extends Component {
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
        if (this.props.loggedIn && this.props.verified) {
            window.location.replace('/');
        } else if (this.props.loggedIn && !this.props.verified) {
            window.location.replace('/verify_account');
        }
    }
    componentWillUnmount() {
        this.props.message.loginText && this.props.dispatch(deleteMessage());
        clearTimeout(this.setTimeoutID);
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    login = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        this.props.message.loginText && this.props.dispatch(deleteMessage());
        this.setState({
            message: 'Please log in to the Intuitive Story.',
            messageRed: {}
        });
        if (this.state.alias && !this.state.aliasRed.color && this.state.pw) {
            const { alias, pw } = this.state;
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(login(alias, pw));
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
    }
    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
    }
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
                            message: 'We sent a new password to your email address.',
                            messageRed: {}
                        });
                    } else {
                        this.setState({
                            message: 'Something went wrong.',
                            messageRed: { color: 'red'  }
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                    this.setState({
                        message: 'No server response.',
                        messageRed: { color: 'red'  }
                    });
                });
        } else {
            this.state.alias || this.setState({
                alias: 'Please enter a user name',
                aliasRed: { color: 'red' }
            });
        }

    }
    render() {
        return (
            <section className="login_component_frame">
                <h1 style={this.props.message.loginColor || this.state.messageRed}>{this.props.message.loginText || this.state.message}</h1>
                <input
                    ref={this.firstInput}
                    style={this.state.aliasRed}
                    name="alias"
                    type="text"
                    value={this.state.alias}
                    placeholder="user name"
                    onFocus={this.emptyField}
                    onChange={this.compileData}
                    onKeyDown={this.login}
                    />
                <input name="pw" type="password" placeholder="password" onChange={this.compileData} onKeyDown={this.login} />
                <button onClick={this.login}>Log in</button>
                <Link to="/register"><button>Not a member yet?</button></Link>
                <button onClick={this.forgotPW}>Forgot your password?</button>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
    loggedIn: state.loggedIn,
    verified: state.user.verified
});

const ConnectedLogin = connect(mapStateToProps)(Login);

export default ConnectedLogin;
