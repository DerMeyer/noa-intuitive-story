import React, { Component } from 'react';
import { connect } from 'react-redux';
import './group-page.css';

import { verifyAccount } from './actions';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vCode: ''
        };
        this.firstInput = React.createRef();
    }
    componentDidMount() {
        this.firstInput.current.focus();
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
        if (this.state.vCode) {
            this.setTimeoutID = setTimeout(() => {
                this.props.dispatch(verifyAccount(this.props.user.alias, this.state.vCode));
            }, 500);
        }
    }
    render() {
        return (
            <section className="group_component_frame">
                <section className="group_container">
                </section>
                <section className="info_container">
                    <h1>{this.props.match.params.user}</h1>
                    <h1>Please enter the confirmation code we sent you via mail.</h1>
                        <input
                            ref={this.firstInput}
                            name="vCode" type="text"
                            value={this.state.vCode}
                            onChange={this.compileData}
                            onKeyDown={this.verify} />
                        <button onClick={this.verify}>Submit</button>
                </section>
                <section className="text_container"></section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupPage = connect(mapStateToProps)(GroupPage);

export default ConnectedGroupPage;
