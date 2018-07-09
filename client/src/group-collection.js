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
            groups: Object.keys(this.props.groups).map(groupID => {
                const { name, time_period, gul, grun, vermel, bezrechu, sagol } = this.props.groups[groupID];
                const groupProps = {
                    name, time_period, gul, grun, vermel, bezrechu, sagol,
                    id: groupID,
                    left: groupID % 2 === 0 ? window.innerWidth / 1.64 : window.innerWidth / 20,
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
                <section></section>
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

const ConnectedGroupCollection= connect(mapStateToProps)(GroupCollection);

export default ConnectedGroupCollection;
