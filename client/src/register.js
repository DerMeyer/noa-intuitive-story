import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from './axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Please register for the Intuitive Story.',
            aliasModal: false
        };
        this.userInput = {};
    }
    compileData = event => {
        this.userInput[event.target.name] = event.target.value;
    }
    register = async event => {
        event.preventDefault();
        console.log(this.userInput);
        // if (this.userInput.mail && this.userInput.pw) {
        //     try {
        //         const resp = await axios.post('/api/login', this.userInput);
        //         if (resp.data.success) {
        //             this.setState({ message: `You're now logged in.` })
        //         } else {
        //             this.setState({ message: 'Wrong mail or password. Please try again.' })
        //         }
        //     } catch (err) {
        //         console.log(err);
        //         this.setState({ message: `Something went wrong. The server didn't respond.` });
        //     }
        // } else {
        //     this.setState({ message: 'Please fill out every field.' });
        // }
    }
    toggleAliasModal = () => {
        if (this.state.aliasModal) {
            this.setState({
                aliasModal: false
            });
        } else {
            this.setState({
                aliasModal: true
            });
        }
    }
    render() {
        return (
            <section className="login_component_frame">
                <h1>{this.state.message}</h1>
                <h3>( All fields are required )</h3>
                <input name="first" type="text" placeholder="first name" onChange={this.compileData} />
                <input name="last" type="text" placeholder="last name" onChange={this.compileData} />
                <div className="login_question">
                    <input name="alias" type="text" placeholder="user name" onChange={this.compileData} />
                    <p onClick={this.toggleAliasModal}>?</p>
                    {this.state.aliasModal && <h2>This can be any name you like!<br/>Your user name will be the only data we show in the site.<br/>All your data will be hadled securely and only accessed by staff of The Intuitive Story.</h2>}
                </div>
                <input name="mail" type="text" placeholder="mail" onChange={this.compileData} />
                <input name="phone" type="text" placeholder="phone" onChange={this.compileData} />
                <input name="pw" type="password" placeholder="password" onChange={this.compileData} />
                <input name="repeat" type="password" placeholder="repeat password" onChange={this.compileData} />
                <button onClick={this.register}>Sign up</button>
                <Link to="/login"><button>Already have an account?</button></Link>
            </section>
        )
    }
}

export default Register;
