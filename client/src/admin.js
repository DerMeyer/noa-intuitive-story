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
            story: '',
            gul_soul: '',
            grun_soul: '',
            vermel_soul: '',
            bezrechu_soul: '',
            sagol_soul: '',
            gul_name: '',
            grun_name: '',
            vermel_name: '',
            bezrechu_name: '',
            sagol_name: '',
            overlay_gul: true,
            overlay_grun: true,
            overlay_vermel: true,
            overlay_bezrechu: true,
            overlay_sagol: true,
            soul_search_gul: false,
            soul_search_grun: false,
            soul_search_vermel: false,
            soul_search_bezrechu: false,
            soul_search_sagol: false,
            user_search_gul: false,
            user_search_grun: false,
            user_search_vermel: false,
            user_search_bezrechu: false,
            user_search_sagol: false,
            user_search: []
        };
        this.soul_list = ['gul', 'grun', 'vermel', 'bezrechu', 'sagol'];
        this.users = [];
        this.style = {
            extraSpace: {
                marginBottom: '3.5vh'
            },
            userSearchResult: {
                cursor: 'pointer',
                width: '20vw',
                paddingLeft: '.5vw',
                borderBottom: '.3vh solid gray',
                margin: '0',
                color: 'rgb(80, 80, 80)'
            }
        };
        this.firstInput = React.createRef();
        this.soulOneInput = React.createRef();
        this.soulTwoInput = React.createRef();
        this.soulThreeInput = React.createRef();
        this.soulFourInput = React.createRef();
        this.soulFiveInput = React.createRef();
        this.userOneInput = React.createRef();
    }
    componentDidMount() {
        window.scroll(0, 0);
        this.firstInput.current.focus();
        this.getUsers();
    }
    componentDidUpdate() {
        if (this.props.user.verified !== 2) {
            window.location.replace('/');
        }
        this.soul_list.forEach(soul => {
            const soulName = this.state[`${soul}_name`].endsWith(' (unverified)') ? this.state[`${soul}_name`].slice(0, -13) : this.state[`${soul}_name`]
            if (this.users.some(user => user.alias === soulName)) {
                this.state[`overlay_${soul}`] === true && this.setState({
                    [`overlay_${soul}`]: false
                });
            } else {
                this.state[`overlay_${soul}`] === false && this.setState({
                    [`overlay_${soul}`]: true,
                    [`${soul}_soul4`]: ''
                });
            }
        });
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        event.target.name.endsWith('name') && this.setUserSearchMenu(event.target.name, event.target.value);
        console.log(this.state.story);
    }
    setSoulSearchMenu = inputName => {
        if (typeof inputName !== 'string') {
            return;
        }
        this.soul_list.forEach(soul => {
            if (inputName.slice(0, -5) === soul) {
                this.state[`soul_search_${soul}`] === false && this.setState({
                    [`soul_search_${soul}`]: true
                });
            } else if (inputName.slice(0, -5) !== soul) {
                this.state[`soul_search_${soul}`] === true && this.setState({
                    [`soul_search_${soul}`]: false
                });
            }
        });
    }
    setUserSearchMenu = (inputName, inputValue) => {
        if (typeof inputName !== 'string' || typeof inputValue !== 'string') {
            return;
        }
        const userSearchMenu = [];
        this.users.forEach(user => {
            if (user.alias.startsWith(inputValue)) {
                user.verified
                ? userSearchMenu.push(user.alias)
                : userSearchMenu.push(user.alias + ' (unverified)')
            }
        });
        this.setState({
            user_search: userSearchMenu.sort()
        });
        this.soul_list.forEach(soul => {
            if (inputName.slice(0, -5) === soul) {
                this.state[`user_search_${soul}`] === false && this.setState({
                    [`user_search_${soul}`]: true
                });
            } else if (inputName.slice(0, -5) !== soul) {
                this.state[`user_search_${soul}`] === true && this.setState({
                    [`user_search_${soul}`]: false
                });
            }
        });
    }
    setSoul = event => {
        this.soul_list.forEach(soul => {
            if (this.state[`soul_search_${soul}`] === true) {
                this.setState({
                    [`${soul}_soul`]: event.target.innerHTML
                });
            }
        });
    }
    setName = event => {
        this.soul_list.forEach(soul => {
            if (this.state[`user_search_${soul}`] === true) {
                this.setState({
                    [`${soul}_name`]: event.target.innerHTML
                });
            }
        });
    }
    emptyField = event => {
        console.log('empty');
        event.stopPropagation();
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
    }
    getUsers = async () => {
        try {
            const resp = await axios.get('/api/get_users');
            if (resp.data.success) {
                this.users = resp.data.users;
            } else {
                this.props.dispatch(setMessage(`The server didn't send any user data.`, 'red'));
            }
        } catch (err) {
            console.log(err);
            this.props.dispatch(setMessage(`The server didn't respond to the user data request.`, 'red'));
        }
    }
    getUserID(name) {
        let id;
        this.users.forEach(user => {
            if (user.alias === name) {
                id = user.id
            }
        });
        return id;
    }
    createGroup = async () => {
        const { name, year, story, gul_soul, grun_soul, vermel_soul, bezrechu_soul, sagol_soul } = this.state;
        const gul_id = this.getUserID(this.state.gul_name);
        const grun_id = this.getUserID(this.state.grun_name);
        const vermel_id = this.getUserID(this.state.vermel_name);
        const bezrechu_id = this.getUserID(this.state.bezrechu_name);
        const sagol_id = this.getUserID(this.state.sagol_name);
        const group = {
            name,
            year,
            story,
            gul_id,
            grun_id,
            vermel_id,
            bezrechu_id,
            sagol_id
        };
        const souls = [];
        gul_id && souls.push({ id: gul_id, soul: gul_soul.toLowerCase() });
        grun_id && souls.push({ id: grun_id, soul: grun_soul.toLowerCase() });
        vermel_id && souls.push({ id: vermel_id, soul: vermel_soul.toLowerCase() });
        bezrechu_id && souls.push({ id: bezrechu_id, soul: bezrechu_soul.toLowerCase() });
        sagol_id && souls.push({ id: sagol_id, soul: sagol_soul.toLowerCase() });
        try {
            const resp = await axios.post('/api/create_group', { group, souls });
            if (resp.data.success) {
                this.props.dispatch(setMessage(`${group.name} ${group.year} has been created.`, 'white'));
                this.setState({
                    name: '',
                    year: '',
                    story: '',
                    gul_soul: '',
                    grun_soul: '',
                    vermel_soul: '',
                    bezrechu_soul: '',
                    sagol_soul: '',
                    gul_name: '',
                    grun_name: '',
                    vermel_name: '',
                    bezrechu_name: '',
                    sagol_name: '',
                    overlay_gul: true,
                    overlay_grun: true,
                    overlay_vermel: true,
                    overlay_bezrechu: true,
                    overlay_sagol: true,
                    soul_search_gul: false,
                    soul_search_grun: false,
                    soul_search_vermel: false,
                    soul_search_bezrechu: false,
                    soul_search_sagol: false,
                    user_search_gul: false,
                    user_search_grun: false,
                    user_search_vermel: false,
                    user_search_bezrechu: false,
                    user_search_sagol: false,
                    user_search: []
                });
            } else {
                this.props.dispatch(setMessage(`The group couldn't be created.`, 'red'));
            }
        } catch (err) {
            console.log(err);
            this.props.dispatch(setMessage(`The server didn't respond.`, 'red'));
        }
    }
    render() {
        return (
            <section className="page_container" onClick={() => {
                    this.setSoulSearchMenu('');
                    this.setUserSearchMenu('', '');
                }}>
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
                        <div className="overlay_container">
                            <input ref={this.soulOneInput} name="gul_soul" type="text" value={this.state.gul_soul} placeholder="role" onChange={this.compileData} onFocus={event => {
                                    this.state.overlay_gul
                                    ? this.soulTwoInput.current.focus()
                                    : this.setSoulSearchMenu(event.target.name)
                                }} onClick={this.emptyField} />
                            {this.state.overlay_gul && <div className="overlay"></div>}
                            {this.state.soul_search_gul && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input ref={this.soulTwoInput} name="grun_soul" type="text" value={this.state.grun_soul} placeholder="role" onChange={this.compileData} onFocus={event => {
                                    this.state.overlay_grun
                                    ? this.soulThreeInput.current.focus()
                                    : this.setSoulSearchMenu(event.target.name)
                                }} onClick={this.emptyField} />
                            {this.state.overlay_grun && <div className="overlay"></div>}
                            {this.state.soul_search_grun && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input ref={this.soulThreeInput} name="vermel_soul" type="text" value={this.state.vermel_soul} placeholder="role" onChange={this.compileData} onFocus={event => {
                                    this.state.overlay_vermel
                                    ? this.soulFourInput.current.focus()
                                    : this.setSoulSearchMenu(event.target.name)
                                }} onClick={this.emptyField} />
                            {this.state.overlay_vermel && <div className="overlay"></div>}
                            {this.state.soul_search_vermel && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input ref={this.soulFourInput} name="bezrechu_soul" type="text" value={this.state.bezrechu_soul} placeholder="role" onChange={this.compileData} onFocus={event => {
                                    this.state.overlay_bezrechu
                                    ? this.soulFiveInput.current.focus()
                                    : this.setSoulSearchMenu(event.target.name)
                                }} onClick={this.emptyField} />
                            {this.state.overlay_bezrechu && <div className="overlay"></div>}
                            {this.state.soul_search_bezrechu && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input ref={this.soulFiveInput} name="sagol_soul" type="text" value={this.state.sagol_soul} placeholder="role" onChange={this.compileData} onFocus={event => {
                                    this.state.overlay_sagol
                                    ? this.userOneInput.current.focus()
                                    : this.setSoulSearchMenu(event.target.name)
                                }} onClick={this.emptyField} />
                            {this.state.overlay_sagol && <div className="overlay"></div>}
                            {this.state.soul_search_sagol && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                        </div>
                    </section>
                    <section>
                        <button style={this.style.extraSpace} onClick={this.createGroup}>Create Group</button>
                        <div className="overlay_container">
                            <input ref={this.userOneInput} name="gul_name" type="text" value={this.state.gul_name} placeholder="user one" onChange={this.compileData} onFocus={event => this.setUserSearchMenu(event.target.name, event.target.value)} onClick={this.emptyField} />
                            {this.state.user_search_gul && <div className="search_menu">{this.state.user_search.map((result, i) => (<p key={i} onClick={this.setName}>{result}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input name="grun_name" type="text" value={this.state.grun_name} placeholder="user two" onChange={this.compileData} onFocus={event => this.setUserSearchMenu(event.target.name, event.target.value)} onClick={this.emptyField} />
                            {this.state.user_search_grun && <div className="search_menu">{this.state.user_search.map((result, i) => (<p key={i} onClick={this.setName}>{result}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input name="vermel_name" type="text" value={this.state.vermel_name} placeholder="user three" onChange={this.compileData} onFocus={event => this.setUserSearchMenu(event.target.name, event.target.value)} onClick={this.emptyField} />
                            {this.state.user_search_vermel && <div className="search_menu">{this.state.user_search.map((result, i) => (<p key={i} onClick={this.setName}>{result}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input name="bezrechu_name" type="text" value={this.state.bezrechu_name} placeholder="user four" onChange={this.compileData} onFocus={event => this.setUserSearchMenu(event.target.name, event.target.value)} onClick={this.emptyField} />
                            {this.state.user_search_bezrechu && <div className="search_menu">{this.state.user_search.map((result, i) => (<p key={i} onClick={this.setName}>{result}</p>))}</div>}
                        </div>
                        <div className="overlay_container">
                            <input name="sagol_name" type="text" value={this.state.sagol_name} placeholder="user five" onChange={this.compileData} onFocus={event => this.setUserSearchMenu(event.target.name, event.target.value)} onClick={this.emptyField} />
                            {this.state.user_search_sagol && <div className="search_menu">{this.state.user_search.map((result, i) => (<p key={i} onClick={this.setName}>{result}</p>))}</div>}
                        </div>
                    </section>
                    <textarea name="story" value={this.state.story} onChange={this.compileData}></textarea>
                </section>
            </section>
        )
    }
}

const mapStateToProps = state => state;

const ConnectedAdmin = connect(mapStateToProps)(Admin);

export default ConnectedAdmin;
