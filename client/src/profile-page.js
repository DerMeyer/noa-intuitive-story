import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from './axios';

import Group from './group';

import { deleteMessage, getGroups, updateProfile, updateIconUrl } from './actions';

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
            confirmPW: '',
            icon_url: '',
            selectedImage: {}
        };
        this.style = {
            adminButton: {
                position: 'absolute',
                top: '-6vh',
                left: '50vw'
            },
            updateProfileButton: {
                width: '16vw'
            },
            row: {
                display: 'flex',
                height: '23vh',
                borderBottom: '.5vh solid gray'
            },
            group:{
                margin: '4vh 2vw 0 2vw'
            },
            story: {
                fontSize: '2vh',
                whiteSpace: 'pre-line',
                lineHeight: '1.3',
                height: '20vh',
                width: '48vw',
                margin: '0 0 0 2vw',
                overflow: 'hidden'
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
                ...this.props.user,
                icon_url: this.props.user.icon_url || '/default.jpeg'
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
            groups: this.props.groups
                        .sort((a, b) => a.group_start - b.group_start)
                        .filter(group => {
                              for (let i = 0; i < 5; i++) {
                                  if (group[`${this.soul_list[i]}_user_id`] === this.props.user.id) {
                                      return true;
                                  }
                              }
                              return false;
                          })
                        .map(group => {
                            return (
                                <section key={group.id} style={this.style.row}>
                                    <section style={this.style.group}>
                                        <Group { ...group } />
                                    </section>
                                    <p style={this.style.story}>{group.story || 'This group has no description.'}</p>
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
            }, 3000);
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
    cancelUpdate = () => {
        this.props.user && this.setState({
            ...this.props.user
        });
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
    selectImage = event => {
        if (!event.target.files[0]) {
            return;
        }
        const targetFile = event.target.files[0];
        const selectedImage = new FileReader();
        selectedImage.readAsDataURL(targetFile);
        selectedImage.addEventListener('load', () => {
            this.setState({
                selectedImage: {
                    url: selectedImage.result,
                    file: targetFile
                }
            });
        });
    }
    cancelUpload = () => {
        this.setState({
            selectedImage: {}
        });
    }
    uploadImage = async () => {
        console.log('hey', this.state.selectedImage.file);
        if (this.state.selectedImage.file) {
            const formData = new FormData();
            formData.append('user_id', this.props.user.id);
            formData.append('file', this.state.selectedImage.file);
            try {
                const resp = await axios.post('/api/upload_image', formData);
                if (resp.data.success) {
                    this.props.dispatch(updateIconUrl(resp.data.icon_url));
                    this.setState({
                        icon_url: resp.data.icon_url,
                        selectedImage: {},
                        message: 'You have a new profile image.'
                    });
                    this.timeoutID = window.setTimeout(() => {
                        this.setState({
                            message: ''
                        });
                    }, 3000);
                } else {
                    this.setState({
                        message: 'Something went wrong.'
                    });
                    this.timeoutID = window.setTimeout(() => {
                        this.setState({
                            message: ''
                        });
                    }, 3000);
                }
            } catch (err) {
                console.log(err);
                this.setState({
                    message: 'No Server response.'
                });
            }
        } else {
            this.setState({
                message: 'No file selected.'
            });
            this.timeoutID = window.setTimeout(() => {
                this.setState({
                    message: ''
                });
            }, 3000);
        }
    }
    render() {
        return (
            <section className="page_container">
                <h1>{this.props.message.updateProfileText || this.state.message || `Hello ${this.props.user && this.props.user.alias}!`}</h1>
                {this.props.user && this.props.user.verified === 2 && <Link to="/avira" style={this.style.adminButton}><button>Manage Page Content</button></Link>}
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
                            <button style={this.style.updateProfileButton} onClick={this.cancelUpdate}>Cancel</button>
                            <button style={this.style.updateProfileButton} onClick={this.updateProfile}>Submit</button>
                        </div>
                    </section>}
                    <section className="profile-image-container">
                        <img src={this.state.selectedImage.url || this.state.icon_url} alt="My Profile Pic"></img>
                            <input
                                id="fileInput"
                                type="file"
                                name="imageforupload"
                                onChange={this.selectImage}
                            ></input>
                        {!this.state.selectedImage.url && <label htmlFor="fileInput" style={this.style.updateProfileButton}>New Image</label>}
                        {this.state.selectedImage.url && <button style={this.style.updateProfileButton} onClick={this.cancelUpload}>Cancel</button>}
                        {this.state.selectedImage.url && <button style={this.style.updateProfileButton} onClick={this.uploadImage}>Submit</button>}
                    </section>
                </section>
                <h2>Your messages</h2>
                <h2>Your groups</h2>
                {this.state.groups}
                <h2>Your history entries</h2>
            </section>
        )
    }
}

const mapStateToProps = state => state;

const ConnectedProfilePage = connect(mapStateToProps)(ProfilePage);

export default ConnectedProfilePage;
