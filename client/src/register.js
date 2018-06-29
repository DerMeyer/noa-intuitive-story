import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from './axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Please register for the Intuitive Story.',
            messageRed: {},
            first: '',
            firstRed: {},
            last: '',
            lastRed: {},
            alias: '',
            aliasRed: {},
            mail: '',
            mailRed: {},
            phone: '',
            phoneRed: {},
            pw: '',
            repeat: '',
            aliasModal: false
        };
        this.firstInput = React.createRef();
    }
    componentDidMount() {
        this.firstInput.current.focus();
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    register = async event => {
        event.preventDefault();
        console.log(this.state);
        this.state.first || this.setErrorMessage('first', 'first name');
        this.state.last || this.setErrorMessage('last', 'last name');
        this.state.alias || this.setErrorMessage('alias', 'user name');
        this.state.mail || this.setErrorMessage('mail', 'mail address');
        this.state.phone || this.setErrorMessage('phone', 'phone number');
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
    setErrorMessage(field, name) {
        this.setState({
            [field]: `Please enter a ${name}`,
            [`${field}Red`]: { color: 'red' }
        });
    }
    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
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
                <h1 style={this.state.messageRed}>{this.state.message}</h1>
                <h3>( All fields are required )</h3>
                <input ref={this.firstInput} style={this.state.firstRed} name="first" type="text" value={this.state.first} placeholder="first name" onClick={this.emptyField} onChange={this.compileData} />
                <input style={this.state.lastRed} name="last" type="text" value={this.state.last} placeholder="last name" onClick={this.emptyField} onChange={this.compileData} />
                <div className="login_question">
                    <input style={this.state.aliasRed} name="alias" type="text" value={this.state.alias} placeholder="user name" onClick={this.emptyField} onChange={this.compileData} />
                    <p onClick={this.toggleAliasModal}>?</p>
                    {this.state.aliasModal && <h2>This can be any name you like!<br/>Your user name will be the only data we show in the site.<br/>All your data will be handled securely and only ever accessed by staff of The Intuitive Story.</h2>}
                </div>
                <input style={this.state.mailRed} name="mail" type="text" value={this.state.mail} placeholder="mail" onClick={this.emptyField} onChange={this.compileData} />
                <input style={this.state.phoneRed} name="phone" type="text" value={this.state.phone} placeholder="phone" onClick={this.emptyField} onChange={this.compileData} />
                <input name="pw" type="password" placeholder="password" onChange={this.compileData} />
                <input name="repeat" type="password" placeholder="repeat password" onChange={this.compileData} />
                <button onClick={this.register}>Sign up</button>
                <Link to="/login"><button>Already have an account?</button></Link>
            </section>
        )
    }
}

export default Register;
