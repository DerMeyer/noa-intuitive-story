import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUp, deleteMessage } from './actions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Sign up for The Intuitive Story.',
            first: '',
            last: '',
            alias: '',
            mail: '',
            phone: '',
            pw: '',
            repeat: '',
            inputTextStyle: {
                first: {},
                last: {},
                alias: {},
                mail: {},
                phone: {}
            },
            aliasModal: false
        };
        this.goToSignIn = React.createRef();
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

        if (
            this.state.first &&
            !this.state.inputTextStyle.first.color &&
            this.state.last &&
            !this.state.inputTextStyle.last.color &&
            this.state.alias &&
            !this.state.inputTextStyle.alias.color &&
            this.state.mail &&
            !this.state.inputTextStyle.mail.color &&
            this.state.phone &&
            !this.state.inputTextStyle.phone.color &&
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
            this.goToSignIn.current.focus();

            this.state.first || this.setErrorMessage('first', 'first name');
            this.state.last || this.setErrorMessage('last', 'last name');
            this.state.alias || this.setErrorMessage('alias', 'user name');
            this.state.mail || this.setErrorMessage('mail', 'mail address');
            this.state.phone || this.setErrorMessage('phone', 'phone number');
            this.state.pw === this.state.repeat ||
                this.setState({ message: `The passwords you entered don't match.` });
            this.state.repeat ||
                this.setState({ message: 'Please repeat your password.' });
            this.state.pw ||
                this.setState({ message: 'Please enter your password.' });
        }
    };

    setErrorMessage(field, name) {
        this.setState(({ inputTextStyle }) => ({
            [field]: `Please enter your ${name}`,
            inputTextStyle: {
                ...inputTextStyle,
                [field]: { color: 'red' }
            }
        }));
    }

    emptyInputField = event => {
        const inputName = event.target.name;
        this.setState(({ inputTextStyle }) => ({
            [inputName]: '',
            inputTextStyle: {
                ...inputTextStyle,
                [inputName]: {}
            }
        }));
    };

    toggleAliasModal = () => {
        this.setState(({ aliasModal }) => ({
            aliasModal: !aliasModal
        }));
    };

    render() {
        return (
            <div className="sign-in-form">
                <h1>{this.props.message || this.state.message}</h1>
                <h3>( All fields are required )</h3>
                <input
                    ref={this.firstInput}
                    style={this.state.inputTextStyle.first}
                    name="first"
                    type="text"
                    value={this.state.first}
                    placeholder="first name"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <input
                    style={this.state.inputTextStyle.last}
                    name="last"
                    type="text"
                    value={this.state.last}
                    placeholder="last name"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <div className="signIn_question">
                    <input
                        style={this.state.inputTextStyle.alias}
                        name="alias"
                        type="text"
                        value={this.state.alias}
                        placeholder="user name"
                        onFocus={this.emptyInputField}
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
                    style={this.state.inputTextStyle.mail}
                    name="mail"
                    type="text"
                    value={this.state.mail}
                    placeholder="mail"
                    onFocus={this.emptyInputField}
                    onChange={this.getUserInput}
                    onKeyDown={this.signUp}
                />
                <input
                    style={this.state.inputTextStyle.phone}
                    name="phone"
                    type="text"
                    value={this.state.phone}
                    placeholder="phone"
                    onFocus={this.emptyInputField}
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
                    <button ref={this.goToSignIn}>
                        Already have an account?
                    </button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = ({ message }) => ({ message });

const ConnectedSignUp = connect(mapStateToProps)(SignUp);

export default ConnectedSignUp;
