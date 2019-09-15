import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../js/axios';
import { SoulNamesTranslation } from '../../js/enums';
import '../../css/page.css';
import '../../css/gamePage.css';
import { getGroups, getPages } from '../../js/actions';
import GroupDisplayBox from '../partials/GroupDisplayBox';
import PageEditor from './dynamic/PageEditor';
import Page from './dynamic/Page';

const dynamicPageStyle = {
    position: 'relative',
    left: '0',
    top: '30px',
    width: '100%',
    padding: '0',
    minHeight: '100px'
};


class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupMap: null,
            dynamicPage: null,
            isScrolledDown: false
        };
        this.groupData = null;
    }

    componentDidMount() {
        window.scroll(0, 0);
        this.getState();
    }

    componentDidUpdate() {
        window.addEventListener('scroll', this.checkIfScrolledDown);
        this.getState();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkIfScrolledDown);
    }

    getState() {
        if (!this.groupData) {
            this.getGroupData();
        } else if (!this.state.groupMap) {
            this.mapGroupData(this.groupData);
        }
        if (!this.state.dynamicPage) {
            this.getDynamicPage();
        }
    }

    checkIfScrolledDown = () => {
        const isScrolledDown = window.scrollY > 50;
        if (isScrolledDown === this.state.isScrolledDown) {
            return;
        }
        this.setState({ isScrolledDown });
    };

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
        const groupMap = {
            name: groupData.name,
            time_period: groupData.time_period,
            story: groupData.story
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

    getDynamicPage = async () => {
        if (!this.props.pages) {
            await this.props.dispatch(getPages());
        }
        const dynamicPage =
            this.props.pages.find(page => page.page_path.join('') === `group${this.props.match.params.id}`)
            || { page_path: ['group', String(this.props.match.params.id)] };
        this.setState({ dynamicPage });
    };

    render() {
        const groupMap = this.state.groupMap || {};
        const { name, time_period } = groupMap;
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
        let pageForRender = null;
        if (this.state.dynamicPage) {
            if (this.props.admin) {
                pageForRender = (
                    <PageEditor
                        page={this.state.dynamicPage}
                        style={dynamicPageStyle}
                    />
                );
            } else {
                pageForRender = (
                    <Page
                        page={this.state.dynamicPage}
                        style={dynamicPageStyle}
                    />
                );
            }
        }
        return (
            <section className="page-container" style={this.props.style || {}}>
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

                <GroupDisplayBox { ...groupMap } />

                <div
                    className="group-page-arrow"
                    style={this.state.isScrolledDown ? { opacity: '0', margin: '0' } : {}}
                >
                    &#8595;
                </div>

                {pageForRender}
            </section>
        );
    }
}

const mapStateToProps = ({ groups, pages }) => ({ groups, pages });

const ConnectedGamePage = connect(mapStateToProps)(GamePage);

export default ConnectedGamePage;
