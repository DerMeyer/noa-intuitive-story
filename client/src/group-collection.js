import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';

import Group from './group';

import { getGroups } from './actions';

class GroupCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style = {
            row: {
                display: 'flex',
                height: '23vh',
                borderBottom: '.5vh solid gray'
            },
            group:{
                margin: '4vh 2vw 0 2vw'
            },
            story: {
                height: '20vh',
                width: '48vw',
                margin: '0 0 0 2vw'
            }
        };
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
    render() {
        return (
            <section className="page_container">
                <h1>Groups collection</h1>
                <h2>Click on a group to see more</h2>
                {this.state.groups}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    user_id: state.user.id,
    groups: state.groups
});

const ConnectedGroupCollection = connect(mapStateToProps)(GroupCollection);

export default ConnectedGroupCollection;
