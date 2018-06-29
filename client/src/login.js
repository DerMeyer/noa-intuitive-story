import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from './axios';

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
        this.checkLogin();
        this.firstInput.current.focus();
    }
    async checkLogin() {
        try {
            const resp = await axios.get('/api/check_login');
            if (resp.data.success) {
                window.location.replace('/');
            }
        } catch (err) {
            console.log(err);
            this.setState({ loginStatus: 'Login check failed' });
        }
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    login = async event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        this.setState({
            message: 'Please log in to the Intuitive Story.',
            messageRed: {}
        });
        if (this.state.alias && !this.state.aliasRed.color && this.state.pw) {
            const { alias, pw } = this.state;
            try {
                const resp = await axios.post('/api/login', { alias, pw });
                if (resp.data.success) {
                    this.setState({ message: `You're now logged in.` });
                } else {
                    this.setState({
                        message: 'Wrong mail or password. Please try again.',
                        messageRed: { color: 'red' }
                    });
                }
            } catch (err) {
                console.log(err);
                this.setState({
                    message: `Something went wrong. The server didn't respond.`,
                    messageRed: { color: 'red' }
                });
            }
        } else {
            this.state.alias || this.setState({
                alias: 'Please enter a user name',
                aliasRed: { color: 'red' }
            });
            this.state.pw || this.setState({
                message: 'Please enter a password.',
                messageRed: { color: 'red' }
            });
        }
        this.checkLogin();
    }
    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
    }
    forgotPW = () => {
        this.setState({ message: `We're working to send you a new password.` });
    }
    render() {
        return (
            <section className="login_component_frame">
                <h1 style={this.state.messageRed}>{this.state.message}</h1>
                <input
                    ref={this.firstInput}
                    style={this.state.aliasRed}
                    name="alias" type="text"
                    value={this.state.alias}
                    placeholder="user name"
                    onFocus={this.emptyField}
                    onChange={this.compileData}
                    onKeyDown={this.login}
                    />
                <input name="pw" type="password" placeholder="password" onChange={this.compileData} onKeyDown={this.login} />
                <button onClick={this.login}>Log in</button>
                <button onClick={this.forgotPW}>Forgot your password?</button>
                <Link to="/register"><button>Not a member yet?</button></Link>
            </section>
        )
    }
}

export default Login;
