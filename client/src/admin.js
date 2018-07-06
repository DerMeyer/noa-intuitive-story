import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';
import axios from './axios';

import { setMessage } from './actions';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            year: '',
            gul_soul: '',
            grun_soul: '',
            vermel_soul: '',
            bezrechu_soul: '',
            sagol_soul: '',
            gul_name: '',
            grun_name: '',
            vermel_name: '',
            bezrechu_name: '',
            sagol_name: ''
        };
        this.style = {
            extraSpace: {
                marginBottom: '3.5vh'
            }
        };
        this.firstInput = React.createRef();
    }
    componentDidMount() {
        this.firstInput.current.focus();
        this.getUsers();
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    getUsers = async () => {
        try {
            const resp = await axios.get('/api/get_users');
            if (resp.data.success) {
                console.log(resp.data);
            } else {
                this.props.dispatch(setMessage(`The server didn't send any user data.`, 'red'));
            }
        } catch (err) {
            console.log(err);
            this.props.dispatch(setMessage(`The server didn't respond to the user data request.`, 'red'));
        }
    }
    createGroup = () => {
        console.log(this.state);
    }
    render() {
        return (
            <section className="page_container">
                <h1>Hi Noa!</h1>
                <h2>Create a new Group</h2>
                <section className="create_group_container">
                    <section>
                        <input
                            ref={this.firstInput}
                            style={this.style.extraSpace}
                            name="name"
                            type="text"
                            value={this.state.name}
                            placeholder="name"
                            onChange={this.compileData}
                            />
                        <h4>Gul</h4>
                        <h4>Grun</h4>
                        <h4>Vermel</h4>
                        <h4>Bezrechu</h4>
                        <h4>Sagol</h4>
                    </section>
                    <section>
                        <input style={this.style.extraSpace} name="year" type="text" value={this.state.year} placeholder="year" onChange={this.compileData} />
                        <input name="gul_soul" type="text" value={this.state.gul_soul} placeholder="soul one"  onChange={this.compileData} />
                        <input name="grun_soul" type="text" value={this.state.grun_soul} placeholder="soul two"  onChange={this.compileData} />
                        <input name="vermel_soul" type="text" value={this.state.vermel_soul} placeholder="soul three"  onChange={this.compileData} />
                        <input name="bezrechu_soul" type="text" value={this.state.bezrechu_soul} placeholder="soul four"  onChange={this.compileData} />
                        <input name="sagol_soul" type="text" value={this.state.sagol_soul} placeholder="soul five" onChange={this.compileData} />
                    </section>
                    <section>
                        <button style={this.style.extraSpace} onClick={this.createGroup}>Create Group</button>
                        <input name="gul_name" type="text" value={this.state.gul_name} placeholder="user one"  onChange={this.compileData} />
                        <input name="grun_name" type="text" value={this.state.grun_name} placeholder="user two"  onChange={this.compileData} />
                        <input name="vermel_name" type="text" value={this.state.vermel_name} placeholder="user three"  onChange={this.compileData} />
                        <input name="bezrechu_name" type="text" value={this.state.bezrechu_name} placeholder="user four"  onChange={this.compileData} />
                        <input name="sagol_name" type="text" value={this.state.sagol_name} placeholder="user five" onChange={this.compileData} />
                    </section>
                </section>
            </section>
        )
    }
}

const mapStateToProps = state => state;

const ConnectedAdmin= connect(mapStateToProps)(Admin);

export default ConnectedAdmin;
