import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteMessage, newVCode, verifyAccount } from './actions';

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vCode: '',
            message: 'Please enter the confirmation code we sent to your e mail address.',
            messageRed: {},
            inputStyle: {
                textAlign: 'center',
                fontSize: '3vh'
            }
        };
        this.firstInput = React.createRef();
    }
    componentDidMount() {
        this.firstInput.current.focus();
    }
    componentDidUpdate(prevProps) {
        if (!this.props.loggedIn || this.props.verified) {
            window.location.replace('/');
        }
    }
    componentWillUnmount() {
        clearTimeout(this.setTimeoutID);
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    verify = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        this.props.message.verifyText && this.props.dispatch(deleteMessage());
        this.setState({
            message: 'Please enter the confirmation code we sent to your e mail address.',
            messageRed: {}
        });
        if (this.state.vCode) {
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(verifyAccount(this.props.alias, this.state.vCode));
            }, 500);
        } else {
            this.setState({
                messageRed: { color: 'red' }
            });
        }
    }
    newCode = () => {
        this.setTimeoutID = setTimeout(() => {
            this.props.dispatch(newVCode(this.props.alias));
        }, 500);
    }
    render() {
        return (
            <section className="login_component_frame">
                <h1 style={this.props.message.verifyColor || this.state.messageRed}>{this.props.message.verifyText || this.state.message}</h1>
                <input
                    ref={this.firstInput}
                    style={this.state.inputStyle}
                    name="vCode" type="text"
                    value={this.state.vCode}
                    onChange={this.compileData}
                    onKeyDown={this.verify} />
                <button onClick={this.verify}>Submit</button>
                <Link to="/"><button>Skip this step</button></Link>
                <button onClick={this.newCode}>Get a new code</button>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    message: state.message,
    ...state.user,
    loggedIn: state.loggedIn
});

const ConnectedVerify = connect(mapStateToProps)(Verify);

export default ConnectedVerify;
