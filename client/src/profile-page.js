import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';

import Group from './group';

import { getGroups } from './actions';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style = {
            row: {
                position: 'relative',
                height: '23vh',
                borderBottom: '.5vh solid gray'
            },
            group:{
                position: 'absolute',
                top: '-21vh',
                left: '0'
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
                    name, time_period, gul, grun, vermel, bezrechu, sagol,
                    id: groupID,
                    left: window.innerWidth / 20,
                    top: 26
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
    render() {
        return (
            <section className="page_container">
                <h1>Welcome {this.props.user && this.props.user.alias}!</h1>
                <h2>Edit your profile</h2>
                <section className="profile_edit_container">
                    <section>
                        <div>
                            <p>First Name</p>
                            <p>{this.props.user && this.props.user.first}</p>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <p>{this.props.user && this.props.user.last}</p>
                        </div>
                        <div>
                            <p>User Name</p>
                            <p>{this.props.user && this.props.user.alias}</p>
                        </div>
                        <div>
                            <p>Mail</p>
                            <p>{this.props.user && this.props.user.mail}</p>
                        </div>
                        <div>
                            <p>Phone</p>
                            <p>{this.props.user && this.props.user.phone}</p>
                        </div>
                        <div>
                            <p>Password</p>
                            <p>***</p>
                        </div>
                        <div>
                            <p>Cancel</p>
                            <p>Submit</p>
                        </div>
                    </section>
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
