import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../js/axios';
import { SoulNamesTranslation } from '../../js/enums';
import '../../css/page.css';
import '../../css/groupPage.css';
import { getGroups } from '../../js/actions';
import GroupDisplayBox from '../partials/GroupDisplayBox';
import TextBlock from '../partials/TextBlock';

const textBlockTitle = 'SYNOPSIS:';

const displayBoxStyle = {
    left: '50%',
    top: '150px',
    transform: 'translateX(-104%)',
    width: '330px',
    height: '330px'
};

const textBlockStyle = {
    left: '50%',
    transform: 'translateX(4%)'
};


class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupMap: null
        };
        this.groupData = null;
    }

    componentDidMount() {
        window.scroll(0, 0);
        this.getGroupData();
    }

    componentDidUpdate() {
        if (!this.groupData) {
            this.getGroupData();
        } else if (!this.state.groupMap) {
            this.mapGroupData(this.groupData);
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
        this.groupData = groupData;
        this.mapGroupData(this.groupData);
    };

    mapGroupData(groupData) {
        const { name, time_period, story } = groupData;
        const groupMap = {
            name,
            time_period,
            story
        };
        Object.keys(SoulNamesTranslation).forEach(soulKey => {
            const soulName = SoulNamesTranslation[soulKey];
            groupMap[soulName] = {
                role: groupData[`${soulName}_role`],
                character: groupData[`${soulName}_character`]
            };
        });
        this.setState({ groupMap });
    }

    render() {
        const groupMap = this.state.groupMap || {};
        const { name, time_period, story } = groupMap;
        let time, mathSign;
        if (typeof time_period === 'number') {
            time = String(Math.abs(time_period));
            mathSign = Math.sign(time_period) || 1;
        }
        let roundedTimeBefore, roundedTimeAfter;
        if (time) {
            const firstDigitBefore = Number(time.slice(-(time.length - 1)))
                ? Number(time.slice(0, 1))
                : Number(time.slice(0, 1)) - 1;
            const firstDigitAfter = Number(time.slice(0, 1)) + 1;
            roundedTimeBefore = firstDigitBefore
                ? mathSign * firstDigitBefore + '0'.repeat(time.length - 1)
                : mathSign * firstDigitBefore;
            roundedTimeAfter = firstDigitAfter
                ? mathSign * firstDigitAfter + '0'.repeat(time.length - 1)
                : mathSign * firstDigitAfter;
            if (mathSign < 0) {
                [roundedTimeBefore, roundedTimeAfter] = [roundedTimeAfter, roundedTimeBefore];
            }
        }
        return (
            <section className="page-container">
                <div className="group-page-header">
                    <div className="group-page-name">
                        {name}
                    </div>
                    <div className="group-page-time-period" style={{ left: '10%' }}>
                        {roundedTimeBefore}
                    </div>
                    <div className="group-page-time-period">
                        {time_period}
                    </div>
                    <div className="group-page-time-period" style={{ left: '90%' }}>
                        {roundedTimeAfter}
                    </div>
                </div>
                <GroupDisplayBox style={displayBoxStyle} { ...groupMap } />
                <TextBlock style={textBlockStyle} headline={textBlockTitle} text={story} />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupPage = connect(mapStateToProps)(GroupPage);

export default ConnectedGroupPage;
