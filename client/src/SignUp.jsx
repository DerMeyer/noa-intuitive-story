import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUp, deleteMessage } from './actions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Sign up for the Intuitive Story.',
            first: '',
            styleFIRST: {},
            last: '',
            styleLAST: {},
            alias: '',
            styleALIAS: {},
            mail: '',
            styleMAIL: {},
            phone: '',
            stylePHONE: {},
            pw: '',
            repeat: '',
            aliasModal: false
        };
        this.goToLogin = React.createRef();
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

    signUp = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }

        event.preventDefault();
        this.props.message && this.props.dispatch(deleteMessage());

        // this.setState({
        //     message: 'Sign up for the Intuitive Story.'
        // });

        if (
            this.state.first &&
            !this.state.styleFirst.color &&
            this.state.last &&
            !this.state.styleLast.color &&
            this.state.alias &&
            !this.state.styleAlias.color &&
            this.state.mail &&
            !this.state.styleMail.color &&
            this.state.phone &&
            !this.state.stylePhone.color &&
            this.state.pw &&
            this.state.pw === this.state.repeat
        ) {
            const { first, last, alias, mail, phone, pw } = this.state;
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(
                    signUp(first, last, alias, mail, phone, pw)
                );
            }, 500);
            this.setState({
                message: 'Please wait...'
            });
        } else {
            this.goToLogin.current.focus();

            this.state.first || this.setErrorMessage('first', 'first name');
            this.state.last || this.setErrorMessage('last', 'last name');
            this.state.alias || this.setErrorMessage('alias', 'user name');
            this.state.mail || this.setErrorMessage('mail', 'mail address');
            this.state.phone || this.setErrorMessage('phone', 'phone number');
            this.state.pw ||
                this.setState({ message: 'Please enter your password.' });
            this.state.repeat ||
                this.setState({ message: 'Please repeat your password.' });
            this.state.pw === this.state.repeat ||
                this.setState({
                    message: `The two passwords you entered don't match.`
                });
        }
    };

    setErrorMessage(field, name) {
        this.setState({
            [field]: `Please enter your ${name}`,
            [`style${field.toUpperCase()}`]: { color: 'red' }
        });
    }

    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`style${event.target.name.toUpperCase()}`]: {}
        });
    };

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
    };

    render() {
        return (
            <div className="sign-in-form">
                <h1>{this.props.message || this.state.message}</h1>
                <h3>( All fields are required )</h3>
                <input
                    ref={this.firstInput}
                    style={this.state.styleFirst}
                    name="first"
                    type="text"
                    value={this.state.first}
                    placeholder="first name"
                    onFocus={this.emptyField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <input
                    style={this.state.styleLast}
                    name="last"
                    type="text"
                    value={this.state.last}
                    placeholder="last name"
                    onFocus={this.emptyField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <div className="signIn_question">
                    <input
                        style={this.state.styleAlias}
                        name="alias"
                        type="text"
                        value={this.state.alias}
                        placeholder="user name"
                        onFocus={this.emptyField}
                        onChange={this.getUserInput}
                        onKeyDown={this.signUp}
                    />
                    <p onClick={this.toggleAliasModal}>?</p>
                    {this.state.aliasModal && (
                        <h2 onClick={this.toggleAliasModal}>
                            This can be any name you like.<br />Your user name
                            will be the only data we display to third parties.<br />All
                            your data will be handled securely and only ever
                            accessed by staff of The Intuitive Story.
                        </h2>
                    )}
                </div>
                <input
                    style={this.state.styleMail}
                    name="mail"
                    type="text"
                    value={this.state.mail}
                    placeholder="mail"
                    onFocus={this.emptyField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <input
                    style={this.state.stylePhone}
                    name="phone"
                    type="text"
                    value={this.state.phone}
                    placeholder="phone"
                    onFocus={this.emptyField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <input
                    name="pw"
                    type="password"
                    placeholder="password"
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <input
                    name="repeat"
                    type="password"
                    placeholder="repeat password"
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <button onClick={this.signUp}>Sign up</button>
                <Link to="/signIn">
                    <button ref={this.goToLogin}>
                        Already have an account?
                    </button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = ({ message }) => ({
    message
});

const ConnectedRegister = connect(mapStateToProps)(Register);

export default ConnectedRegister;
