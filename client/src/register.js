import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register, deleteMessage } from './actions';

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
    componentDidUpdate() {
        if (this.props.loggedIn && this.props.verified) {
            window.location.replace('/');
        } else if (this.props.loggedIn && !this.props.verified) {
            window.location.replace('/verify_account');
        }
    }
    componentWillUnmount() {
        this.props.message.registerText && this.props.dispatch(deleteMessage());
        clearTimeout(this.setTimeoutID);
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    register = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        this.props.message.registerText && this.props.dispatch(deleteMessage());
        this.setState({
            message: 'Please register for the Intuitive Story.',
            messageRed: {}
        });
        if (
            this.state.first && !this.state.firstRed.color
            && this.state.last && !this.state.lastRed.color
            && this.state.alias && !this.state.aliasRed.color
            && this.state.mail && !this.state.mailRed.color
            && this.state.phone && !this.state.phoneRed.color
            && this.state.pw
            && this.state.pw === this.state.repeat
        ) {
            const { first, last, alias, mail, phone, pw } = this.state;
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(register(first, last, alias, mail, phone, pw));
            }, 500);
            this.setState({
                message: 'Please wait...'
            });
        } else {
            this.state.first || this.setErrorMessage('first', 'first name');
            this.state.last || this.setErrorMessage('last', 'last name');
            this.state.alias || this.setErrorMessage('alias', 'user name');
            this.state.mail || this.setErrorMessage('mail', 'mail address');
            this.state.phone || this.setErrorMessage('phone', 'phone number');
            this.state.pw === this.state.repeat || this.setState({
                message: `The two passwords you entered don't match.`,
                messageRed: { color: 'red' }
            });
            this.state.repeat || this.setState({
                message: 'Please enter your password a second time.',
                messageRed: { color: 'red' }
            });
            this.state.pw || this.setErrorMessage('message', 'password.');
        }
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
                <h1 style={this.props.message.registerColor || this.state.messageRed}>{this.props.message.registerText || this.state.message}</h1>
                <h3>( All fields are required )</h3>
                <input
                    ref={this.firstInput}
                    style={this.state.firstRed}
                    name="first" type="text"
                    value={this.state.first}
                    placeholder="first name"
                    onFocus={this.emptyField}
                    onChange={this.compileData}
                    onKeyDown={this.register}
                    />
                <input style={this.state.lastRed} name="last" type="text" value={this.state.last} placeholder="last name" onFocus={this.emptyField} onChange={this.compileData} onKeyDown={this.register} />
                <div className="login_question">
                    <input style={this.state.aliasRed} name="alias" type="text" value={this.state.alias} placeholder="user name" onFocus={this.emptyField} onChange={this.compileData} onKeyDown={this.register} />
                    <p onClick={this.toggleAliasModal}>?</p>
                    {this.state.aliasModal && <h2 onClick={this.toggleAliasModal}>This can be any name you like.<br/>Your user name will be the only data we show in the site.<br/>All your data will be handled securely and only ever accessed by staff of The Intuitive Story.</h2>}
                </div>
                <input style={this.state.mailRed} name="mail" type="text" value={this.state.mail} placeholder="mail" onFocus={this.emptyField} onChange={this.compileData} onKeyDown={this.register} />
                <input style={this.state.phoneRed} name="phone" type="text" value={this.state.phone} placeholder="phone" onFocus={this.emptyField} onChange={this.compileData} onKeyDown={this.register} />
                <input name="pw" type="password" placeholder="password" onChange={this.compileData} onKeyDown={this.register} />
                <input name="repeat" type="password" placeholder="repeat password" onChange={this.compileData} onKeyDown={this.register} />
                <button onClick={this.register}>Sign up</button>
                <Link to="/login"><button>Already have an account?</button></Link>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
    loggedIn: state.loggedIn,
    verified: state.user.verified
});

const ConnectedRegister = connect(mapStateToProps)(Register);

export default ConnectedRegister;
