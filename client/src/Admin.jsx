import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from './axios';

import { setMessage, getGroups, getHistory } from './actions';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time_period: '',
            story: '',
            gul_role: '',
            grun_role: '',
            vermel_role: '',
            bezrechu_role: '',
            sagol_role: '',
            gul_character: '',
            grun_character: '',
            vermel_character: '',
            bezrechu_character: '',
            sagol_character: '',
            gul_name: '',
            grun_name: '',
            vermel_name: '',
            bezrechu_name: '',
            sagol_name: '',
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
            user_search: [],
            group_search_overlay: false,
            group_search: [],
            group_for_edit: {},
            users: []
        };
        this.soul_list = ['gul', 'grun', 'vermel', 'bezrechu', 'sagol'];
        this.style = {
            adminButton: {
                position: 'absolute',
                top: '-6vh',
                left: '50vw'
            },
            extraSpace: {
                marginBottom: '3.5vh'
            },
            extraSpaceCancelButton: {
                width: '9.5vw',
                marginRight: '.5vw',
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
    }
    componentDidMount() {
        window.scroll(0, 0);
        this.getUsers();
        this.props.dispatch(getGroups());
        this.props.dispatch(getHistory());
    }
    getUsers = async () => {
        try {
            const resp = await axios.get('/api/get_users');
            if (resp.data.success) {
                this.setState({
                    users: resp.data.users
                });
            } else {
                this.props.dispatch(setMessage(`The server didn't send any user data.`, 'red'));
            }
        } catch (err) {
            console.log(err);
            this.props.dispatch(setMessage(`The server didn't respond to the user data request.`, 'red'));
        }
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value || (event.target.name === 'name' ? '' : this.state.group_for_edit[event.target.name])
        });
        if (event.target.name === 'name') {
            this.setGroupSearchMenu(event.target.name, event.target.value);
        } else if (event.target.name.endsWith('name')) {
            this.setUserSearchMenu(event.target.name, event.target.value);
        }
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
        this.state.users.forEach(user => {
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
    setGroupSearchMenu = (inputName, inputValue) => {
        if (inputName !== 'name') {
            return this.setState({
                group_search_overlay: false,
                group_search: []
            });
        }
        if (typeof inputValue !== 'string') {
            return;
        }
        const groupSearchMenu = [];
        this.props.groups.forEach(group => {
            if (group.name.startsWith(inputValue)) {
                groupSearchMenu.push(group.name);
            }
        });
        this.setState({
            group_search_overlay: true,
            group_search: groupSearchMenu.sort()
        });
    }
    setSoul = event => {
        this.soul_list.forEach(soul => {
            if (this.state[`soul_search_${soul}`] === true) {
                this.setState({
                    [`${soul}_role`]: event.target.innerHTML
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
    setGroup = event => {
        const groupForEdit = this.props.groups.filter(group => group.name === event.target.innerHTML)[0];
        const {
            gul_user_id,
            grun_user_id,
            vermel_user_id,
            bezrechu_user_id,
            sagol_user_id
        } = groupForEdit;
        groupForEdit.gul_name = this.getUserName(gul_user_id);
        groupForEdit.grun_name = this.getUserName(grun_user_id);
        groupForEdit.vermel_name = this.getUserName(vermel_user_id);
        groupForEdit.bezrechu_name = this.getUserName(bezrechu_user_id);
        groupForEdit.sagol_name = this.getUserName(sagol_user_id);
        const {
            name,
            time_period,
            story,
            gul_role,
            grun_role,
            vermel_role,
            bezrechu_role,
            sagol_role,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character,
            gul_name,
            grun_name,
            vermel_name,
            bezrechu_name,
            sagol_name
        } = groupForEdit;
        this.setState({
            group_for_edit: groupForEdit,
            name,
            time_period,
            story,
            gul_role,
            grun_role,
            vermel_role,
            bezrechu_role,
            sagol_role,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character,
            gul_name,
            grun_name,
            vermel_name,
            bezrechu_name,
            sagol_name
        });
    }
    emptyField = event => {
        event.stopPropagation();
        this.setState({
            [event.target.name]: this.state.group_for_edit[event.target.name] || ''
        });
    }
    getUserID(name) {
        let id;
        this.state.users.forEach(user => {
            if (user.alias === name) {
                id = user.id
            }
        });
        return id;
    }
    getUserName(id) {
        let name;
        this.state.users.forEach(user => {
            if (user.id === id) {
                name = user.alias
            }
        });
        console.log(name);
        return name;
    }
    createGroup = async () => {
        const {
            name,
            time_period,
            story,
            gul_role,
            grun_role,
            vermel_role,
            bezrechu_role,
            sagol_role,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character,
            gul_name,
            grun_name,
            vermel_name,
            bezrechu_name,
            sagol_name
        } = this.state;
        const gul_id = this.getUserID(gul_name) || 0;
        const grun_id = this.getUserID(grun_name) || 0;
        const vermel_id = this.getUserID(vermel_name) || 0;
        const bezrechu_id = this.getUserID(bezrechu_name) || 0;
        const sagol_id = this.getUserID(sagol_name) || 0;
        try {
            const resp = await axios.post('/api/create_group', {
                name,
                time_period,
                story,
                gul_id,
                grun_id,
                vermel_id,
                bezrechu_id,
                sagol_id,
                gul_role,
                grun_role,
                vermel_role,
                bezrechu_role,
                sagol_role,
                gul_character,
                grun_character,
                vermel_character,
                bezrechu_character,
                sagol_character
            });
            if (resp.data.success) {
                this.props.dispatch(setMessage(`${name} ${time_period} has been created.`, 'white'));
                this.setState({
                    name: '',
                    time_period: '',
                    story: '',
                    gul_role: '',
                    grun_role: '',
                    vermel_role: '',
                    bezrechu_role: '',
                    sagol_role: '',
                    gul_character: '',
                    grun_character: '',
                    vermel_character: '',
                    bezrechu_character: '',
                    sagol_character: '',
                    gul_name: '',
                    grun_name: '',
                    vermel_name: '',
                    bezrechu_name: '',
                    sagol_name: '',
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
                    user_search: [],
                    group_search_overlay: false,
                    group_search: [],
                    group_for_edit: {}
                });
                this.props.dispatch(getGroups());
            } else {
                this.props.dispatch(setMessage(`The group couldn't be created.`, 'red'));
            }
        } catch (err) {
            console.log(err);
            this.props.dispatch(setMessage(`The server didn't respond.`, 'red'));
        }
    }
    updateGroup = async () => {
        const {
            name,
            time_period,
            story,
            gul_role,
            grun_role,
            vermel_role,
            bezrechu_role,
            sagol_role,
            gul_character,
            grun_character,
            vermel_character,
            bezrechu_character,
            sagol_character,
            gul_name,
            grun_name,
            vermel_name,
            bezrechu_name,
            sagol_name
        } = this.state;
        const gul_id = this.getUserID(gul_name) || 0;
        const grun_id = this.getUserID(grun_name) || 0;
        const vermel_id = this.getUserID(vermel_name) || 0;
        const bezrechu_id = this.getUserID(bezrechu_name) || 0;
        const sagol_id = this.getUserID(sagol_name) || 0;
        try {
            const resp = await axios.post('/api/update_group', {
                id: this.state.group_for_edit.id,
                name,
                time_period,
                story,
                gul_id,
                grun_id,
                vermel_id,
                bezrechu_id,
                sagol_id,
                gul_role,
                grun_role,
                vermel_role,
                bezrechu_role,
                sagol_role,
                gul_character,
                grun_character,
                vermel_character,
                bezrechu_character,
                sagol_character
            });
            if (resp.data.success) {
                this.props.dispatch(setMessage(`${name} ${time_period} has been updated.`, 'white'));
                this.setState({
                    name: '',
                    time_period: '',
                    story: '',
                    gul_role: '',
                    grun_role: '',
                    vermel_role: '',
                    bezrechu_role: '',
                    sagol_role: '',
                    gul_character: '',
                    grun_character: '',
                    vermel_character: '',
                    bezrechu_character: '',
                    sagol_character: '',
                    gul_name: '',
                    grun_name: '',
                    vermel_name: '',
                    bezrechu_name: '',
                    sagol_name: '',
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
                    user_search: [],
                    group_search_overlay: false,
                    group_search: [],
                    group_for_edit: {}
                });
                this.props.dispatch(getGroups());
            } else {
                this.props.dispatch(setMessage(`The group couldn't be updated.`, 'red'));
            }
        } catch (err) {
            console.log(err);
            this.props.dispatch(setMessage(`The server didn't respond.`, 'red'));
        }
    }
    cancelGroupUpdate = () => {
        this.setState({
            name: '',
            time_period: '',
            story: '',
            gul_role: '',
            grun_role: '',
            vermel_role: '',
            bezrechu_role: '',
            sagol_role: '',
            gul_character: '',
            grun_character: '',
            vermel_character: '',
            bezrechu_character: '',
            sagol_character: '',
            gul_name: '',
            grun_name: '',
            vermel_name: '',
            bezrechu_name: '',
            sagol_name: '',
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
            user_search: [],
            group_search_overlay: false,
            group_search: [],
            group_for_edit: {}
        });
    }
    render() {
        if (this.props.user.verified !== 2) {
            return (
                <section className="page_container">
                    <h1>Warning!</h1>
                    <h2>This page is not for you.</h2>
                </section>
            )
        }
        return (
            <section className="page_container" onClick={() => {
                    this.setSoulSearchMenu('');
                    this.setUserSearchMenu('', '');
                    this.setGroupSearchMenu('', '');
                }}>
                <h1>Hello Noa!</h1>
                <Link to="/profile/Noa" style={this.style.adminButton}><button>Back to your Profile</button></Link>
                <h2>Groups</h2>
                <section className="manage-groups-container">
                    <article className="create-group-article">
                        <h4>Title</h4>
                        <img className="create-group-image" src="/images/color_gul.png" alt="Gul" />
                        <img className="create-group-image" src="/images/color_grun.png" alt="Grun" />
                        <img className="create-group-image" src="/images/color_vermel.png" alt="Vermel" />
                        <img className="create-group-image" src="/images/color_bezrechu.png" alt="Bezrechu" />
                        <img className="create-group-image" src="/images/color_sagol.png" alt="Sagol" />
                    </article>
                    <section>
                        <div className="overlay_container">
                            <input
                                style={this.style.extraSpace}
                                name="name"
                                type="text"
                                value={this.state.name}
                                placeholder="name"
                                onChange={this.compileData}
                                onFocus={event => {this.setGroupSearchMenu(event.target.name, event.target.value)}}
                                onClick={this.emptyField}
                            />
                        {this.state.group_search_overlay && <div className="search_menu">{this.state.group_search.map((groupName, i) => (<p key={i} onClick={this.setGroup}>{groupName}</p>))}</div>}
                        </div>
                            <div className="overlay_container">
                                <input name="gul_role" type="text" value={this.state.gul_role} placeholder="role" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                                {this.state.soul_search_gul && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                            </div>
                            <div className="overlay_container">
                                <input name="grun_role" type="text" value={this.state.grun_role} placeholder="role" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                                {this.state.soul_search_grun && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                            </div>
                            <div className="overlay_container">
                                <input name="vermel_role" type="text" value={this.state.vermel_role} placeholder="role" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                                {this.state.soul_search_vermel && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                            </div>
                            <div className="overlay_container">
                                <input name="bezrechu_role" type="text" value={this.state.bezrechu_role} placeholder="role" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                                {this.state.soul_search_bezrechu && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                            </div>
                            <div className="overlay_container">
                                <input name="sagol_role" type="text" value={this.state.sagol_role} placeholder="role" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                                {this.state.soul_search_sagol && <div className="search_menu">{this.soul_list.map((soul, i) => (<p key={i} onClick={this.setSoul}>{soul}</p>))}</div>}
                            </div>
                    </section>
                    <section>
                        <input style={this.style.extraSpace} name="time_period" type="text" value={this.state.time_period} placeholder="year" onChange={this.compileData} onClick={this.emptyField} />
                        <input name="gul_character" type="text" value={this.state.gul_character} placeholder="character" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                        <input name="grun_character" type="text" value={this.state.grun_character} placeholder="character" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                        <input name="vermel_character" type="text" value={this.state.vermel_character} placeholder="character" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                        <input name="bezrechu_character" type="text" value={this.state.bezrechu_character} placeholder="character" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                        <input name="sagol_character" type="text" value={this.state.sagol_character} placeholder="character" onChange={this.compileData} onFocus={event => {this.setSoulSearchMenu(event.target.name)}} onClick={this.emptyField} />
                    </section>
                    <section>
                        {this.state.group_for_edit.id
                            ? <div>
                                <button style={this.style.extraSpaceCancelButton} onClick={this.cancelGroupUpdate}>Cancel</button>
                                <button style={this.style.extraSpaceCancelButton} onClick={this.updateGroup}>Update</button>
                              </div>
                            : <button style={this.style.extraSpace} onClick={this.createGroup}>Create Group</button>}
                        <div className="overlay_container">
                            <input name="gul_name" type="text" value={this.state.gul_name} placeholder="user one" onChange={this.compileData} onFocus={event => this.setUserSearchMenu(event.target.name, event.target.value)} onClick={this.emptyField} />
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
                <h2>History</h2>
                <section>
                    <section className="manage-history-container">
                        <h4>Name</h4>
                        <h4>Year</h4>
                        <h4>Place</h4>
                        <h4>Link</h4>
                        <h4>Comment</h4>
                    </section>
                    {Array.isArray(this.props.history) && this.props.history.map(history => (
                        <section className="manage-history-container">
                            <p>{history.name}</p>
                            <p>{history.time_period}</p>
                            <p>{history.place}</p>
                            <p>{history.link}</p>
                            <p>{history.comment}</p>
                            <button>Edit</button>
                            <button>Delete</button>
                            <button>User?</button>
                        </section>
                    ))}
                </section>
                <h2>Users</h2>
                <section>
                    <section className="manage-user-container">
                        <h4>Username</h4>
                        <h4>Firstname</h4>
                        <h4>Lastname</h4>
                        <h4>Mail</h4>
                        <h4>Phone</h4>
                        <h4>Registered</h4>
                        <h4>Verified</h4>
                    </section>
                    {this.state.users.map(user => {
                        if (user.verified !== 2) {
                            return (
                                <section className="manage-user-container">
                                    <p>{user.alias}</p>
                                    <p>{user.first}</p>
                                    <p>{user.last}</p>
                                    <p>{user.mail}</p>
                                    <p>{user.phone}</p>
                                    <p>{user.created_at.slice(0, 10).split('-').reverse().join('. ')}</p>
                                    <p>{user.verified ? 'yes' : 'no'}</p>
                                    <button>Ban</button>
                                </section>
                            )
                        } else {
                            return false;
                        }
                    })}
                </section>
            </section>
        )
    }
}

const mapStateToProps = state => state;

const ConnectedAdmin = connect(mapStateToProps)(Admin);

export default ConnectedAdmin;
