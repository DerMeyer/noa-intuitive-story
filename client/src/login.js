import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from './axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Please log in to the Intuitive Story.'
        };
        this.userInput = {};
    }
    compileData = event => {
        this.userInput[event.target.name] = event.target.value;
    }
    login = async event => {
        event.preventDefault();
        if (this.userInput.mail && this.userInput.pw) {
            try {
                const resp = await axios.post('/api/login', this.userInput);
                if (resp.data.success) {
                    this.setState({ message: `You're now logged in.` })
                } else {
                    this.setState({ message: 'Wrong mail or password. Please try again.' })
                }
            } catch (err) {
                console.log(err);
                this.setState({ message: `Something went wrong. The server didn't respond.` });
            }
        } else {
            this.setState({ message: 'Please fill out every field.' });
        }
    }
    forgotPW = () => {}
    render() {
        return (
            <section className="login_component_frame">
                <h1>{this.state.message}</h1>
                <input name="mail" type="text" placeholder="mail" onChange={this.compileData} />
                <input name="pw" type="password" placeholder="password" onChange={this.compileData} />
                <button onClick={this.login}>Log In</button>
                <button onClick={this.forgotPW}>Forgot your password?</button>
                <Link to="/register"><button>Not a member yet?</button></Link>
            </section>
        )
    }
}

export default Login;
