import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';

import Group from './group';

import { deleteMessage, getGroups, updateProfile } from './actions';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            message: '',
            first: '',
            last: '',
            alias: '',
            mail: '',
            phone: '',
            newPW: '',
            confirmPW: ''
        };
        this.style = {
            row: {
                height: '23vh',
                borderBottom: '.5vh solid gray'
            },
            group:{
                margin: '4vh 2vw 0 2vw'
            }
        };
        this.soul_list = ['gul', 'grun', 'vermel', 'bezrechu', 'sagol'];
    }
    componentDidMount() {
        window.scroll(0, 0);
        if (!this.props.groups) {
            this.props.dispatch(getGroups());
        } else {
            this.createGroupsForRender();
        }
    }
    componentDidUpdate() {
        this.createGroupsForRender();
        if (!this.state.user) {
            this.props.user && this.setState({
                user: true,
                ...this.props.user
            });
        }
    }
    componentWillUnmount() {
        this.props.message.updateProfileText && this.props.dispatch(deleteMessage());
        clearTimeout(this.setTimeoutID);
    }
    createGroupsForRender = () => {
        if (!this.props.groups || this.state.groups) {
            return this.state.groups;
        }
        this.setState({
            groups: Object.keys(this.props.groups)
                          .filter(groupID => {
                              for (let i = 0; i < 5; i++) {
                                  if (this.props.groups[groupID][this.soul_list[i]] && this.props.groups[groupID][this.soul_list[i]].user_id === this.props.user.id) {
                                      return true;
                                  }
                              }
                              return false;
                          })
                          .sort((a, b) => this.props.groups[a].group_start - this.props.groups[b].group_start)
                          .map(groupID => {
                const { name, time_period, gul, grun, vermel, bezrechu, sagol } = this.props.groups[groupID];
                const groupProps = {
                    id: groupID,
                    name, time_period, gul, grun, vermel, bezrechu, sagol
                }
                return (
                    <section key={groupID} style={this.style.row}>
                        <section style={this.style.group}>
                            <Group { ...groupProps } />
                        </section>
                    </section>
                )
            })
        });
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    updateProfile = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        this.props.message.updateProfileText && this.props.dispatch(deleteMessage());
        this.setState({
            message: ''
        });
        if (this.state.newPW !== this.state.confirmPW) {
            this.setState({
                message: `The two passwords you entered don't match.`
            });
            this.timeoutID = window.setTimeout(() => {
                this.setState({
                    message: ''
                });
            }, 2000);
        } else {
            const { id, prev_first, prev_last, prev_alias, prev_mail, prev_phone } = this.props.user;
            const { first = prev_first, last = prev_last, alias = prev_alias, mail = prev_mail, phone = prev_phone, newPW } = this.state;
            this.props.dispatch(updateProfile(id, first, last, alias, mail, phone, newPW));
            this.timeoutID = window.setTimeout(() => {
                this.setState({
                    message: ''
                });
            }, 4000);
        }
    }
    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
    }
    fillField = event => {
        if (!this.state[event.target.name]) {
            this.setState({
                [event.target.name]: this.props.user[event.target.name]
            });
        }
    }
    render() {
        return (
            <section className="page_container">
                <h1>{this.props.message.updateProfileText || this.state.message || `Hello ${this.props.user && this.props.user.alias}!`}</h1>
                <h2>Edit your profile</h2>
                <section className="profile_edit_container">
                    {this.props.user && !this.props.user.verified && <p>Please verify your account.</p>}
                    {this.props.user && this.props.user.verified && <section>
                        <div>
                            <p>First Name</p>
                            <input name="first" type="text" value={this.state.first} placeholder="first name" onFocus={this.emptyField} onBlur={this.fillField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>Last Name</p>
                            <input name="last" type="text" value={this.state.last} placeholder="last name" onFocus={this.emptyField} onBlur={this.fillField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>User Name</p>
                            <input name="alias" type="text" value={this.state.alias} placeholder="user name" onFocus={this.emptyField} onBlur={this.fillField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>Mail</p>
                            <input name="mail" type="text" value={this.state.mail} placeholder="mail" onFocus={this.emptyField} onBlur={this.fillField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>Phone</p>
                            <input name="phone" type="text" value={this.state.phone} placeholder="phone" onFocus={this.emptyField} onBlur={this.fillField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>New Password</p>
                            <input name="newPW" type="password" value={this.state.newPW} placeholder="new password" onFocus={this.emptyField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>Confirm Password</p>
                            <input name="confirmPW" type="password" value={this.state.confirmPW} placeholder="confirm password" onFocus={this.emptyField} onChange={this.compileData} onKeyDown={this.updateProfile} />
                        </div>
                        <div>
                            <p>Cancel</p>
                            <p>Submit</p>
                        </div>
                    </section>}
                    <img src="/default.jpeg" alt="My Profile Pic"></img>
                </section>
                <h2>Your groups</h2>
                {this.state.groups}
                <h2>Your messages</h2>
            </section>
        )
    }
}

const mapStateToProps = state => state;

const ConnectedProfilePage = connect(mapStateToProps)(ProfilePage);

export default ConnectedProfilePage;
