import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';

import Group from './Group';

import { getGroups } from './actions';

class GroupCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style = {
            row: {
                display: 'flex',
                height: '23vh',
                borderBottom: '.5vh solid gray',
                transform: 'scale(.8)'
            },
            group:{
                margin: '4vh 2vw 0 2vw'
            },
            story: {
                position: 'absolute',
                right: '20px',
                bottom: '40px',
                fontSize: '2vh',
                whiteSpace: 'pre-line',
                lineHeight: '1.3',
                maxHeight: '20vh',
                width: '48vw',
                margin: '0 0 0 2vw',
                overflow: 'scroll'
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
            groups: this.props.groups
                        .sort((a, b) => a.group_start - b.group_start)
                        .map(group => {
                            return (
                                <section key={group.id} style={this.style.row}>
                                    <section style={this.style.group}>
                                        <Group { ...group } />
                                    </section>
                                    <p style={this.style.story}>{group.story || 'More soon...'}</p>
                                </section>
                            )
                        })
        });
    }
    render() {
        return (
            <section className="page-container">
                <h3>All Games</h3>
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
