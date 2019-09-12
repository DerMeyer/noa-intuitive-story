import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../js/axios';
import { SoulNames } from '../../js/enums';
import '../../css/page.css';

import Group from '../partials/Group';

import { getGroups } from '../../js/actions';
import GroupDisplayBox from '../partials/GroupDisplayBox';

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupMap: null
        };
    }

    componentDidMount() {
        this.getGroupData();
    }

    componentDidUpdate() {
        if (!this.state.groupMap) {
            this.getGroupData();
        }
    }

    getGroupData = async () => {
        if (!this.props.groups) {
            await this.props.dispatch(getGroups());
        }
        const groupData = this.props.groups.filter(group => group.id === Number(this.props.match.params.id))[0];
        for (const key in groupData) {
            if (key.endsWith('_id')) {
                const response = await axios.post('/api/get_user', { userId: groupData[key] });
                if (response.data.success) {
                    groupData[key.slice(0, -3)] = response.data.user[0];
                }
            }
        }
        this.mapGroupData(groupData);
    };

    mapGroupData(groupData) {
        const { name, time_period, story } = groupData;
        const groupMap = {
            name,
            time_period,
            story
        };
        Object.keys(SoulNames).forEach(soulKey => {
            const soulName = SoulNames[soulKey];
            groupMap[soulName] = {
                role: groupData[`${soulName}_role`],
                character: groupData[`${soulName}_character`]
            };
        });
        console.log('GROUP MAP:', groupMap);
        this.setState({ groupMap });
    }

    render() {
        return (
            <section className="page-container">
                <GroupDisplayBox { ...this.state.groupMap } />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupPage = connect(mapStateToProps)(GroupPage);

export default ConnectedGroupPage;
