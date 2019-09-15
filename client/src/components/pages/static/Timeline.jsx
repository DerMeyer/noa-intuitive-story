import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from '../../partials/Game';

import { getGroups } from '../../../js/actions';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.timelineImageQuotient = 6;
        this.state = {
            timelineLeft: ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth) / 2,
            newHistoryEntry: false,
            addHistoryStyle: {},
            year: '',
            name: '',
            location: '',
            link: '',
            comment: ''
        };
        this.style = {
            expander: {
                height: '300vh'
            },
            timelineContainer: {
                position: 'fixed',
                top: '110px',
                left: '0',
                height: '82vh',
                width: '100vw'
            },
            timelineSled: {
                position: 'absolute',
                top: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '82vh'
            },
            timeline: {
                cursor: 'grab',
                height: '60vh',
                transform: 'scale(1.0108, 1) translateX(-.09%)'
            },
            historyCreatorH3: {
                fontSize: '3vh',
                lineHeight: '1'
            },
            verifyP: {
                margin: '0'
            }
        };
        this.timelineMap = [
            [0, -80000],
            [60, -70000],
            [290, -65000],
            [520, -60000],
            [750, -55000],
            [980, -50000],
            [1210, -45000],
            [1440, -40000],
            [1670, -35000],
            [1900, -30000],
            [2130, -25000],
            [2360, -20000],
            [2590, -15000],
            [2820, -10000],
            [3050, -9500],
            [3280, -9000],
            [3510, -8500],
            [3740, -8000],
            [3970, -7500],
            [4200, -7000],
            [4430, -6500],
            [4660, -6000],
            [4890, -5500],
            [5120, -5000],
            [5350, -4500],
            [5580, -4000],
            [5810, -3500],
            [6040, -3000],
            [6270, -2500],
            [6500, -2000],
            [6730, -1500],
            [6960, -1000],
            [7190, -500],
            [7420, 0],
            [7650, 500],
            [7880, 1000],
            [8110, 1500],
            [8340, 2000],
            [8570, 2500],
            [8800, 3000],
            [9030, 3500],
            [9260, 4000],
            [9300, 5000]
        ];
        this.timelineSled = React.createRef();
        this.isDragging = false;
        this.previousLeft = 0;
        this.mouseDownX = 0;
    }

    componentDidMount() {
        this.scrollFactor = ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth) / (2 * window.innerHeight);
        const initialCenteredYear = 0;
        const initialScrollY = Math.min(((this.mapTimelineToPosition(initialCenteredYear) - window.innerWidth / 2) / this.scrollFactor), (2 * window.innerHeight));
        window.scroll(0, initialScrollY);
        this.setTimelineLeft();
        this.props.dispatch(getGroups());
        // this.props.dispatch(getHistory());
        this.props.toggleSouls(true);
    }

    componentDidUpdate() {
        this.scrollFactor = ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth) / (2 * window.innerHeight);
        this.createGroupsForRender();
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutID);
        this.props.toggleSouls(false);
    }

    setTimelineLeft = () => {
        if (this.state.timelineLeft !== window.scrollY * this.scrollFactor) {
            this.setState({
                timelineLeft: window.scrollY * this.scrollFactor
            });
        }
        if (!this.isDragging) {
            this.setTimeoutID = setTimeout(() => {
                this.setTimelineLeft();
            }, 30);
        }
    };

    onDown = event => {
        event.preventDefault();
        this.isDragging = true;
        this.extractLeftDelta(event);
        this.hasDragged(event);
    };

    onMove = event => {
        event.preventDefault();
        if (!this.isDragging) {
            return;
        }
        const left = this.extractLeftDelta(event);
        this.setState(({ timelineLeft }) => ({
            timelineLeft: timelineLeft <= ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth) ? timelineLeft - left : timelineLeft
        }));
    };

    onUp = event => {
        if (this.state.timelineLeft > ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth)) {
            this.setState({
                timelineLeft: (window.innerHeight * this.timelineImageQuotient) - window.innerWidth
            });
        }
        if (this.isDragging) {
            window.scroll(0, - this.timelineSled.current.offsetLeft / this.scrollFactor);
            this.isDragging = false;
            this.setTimelineLeft();
        }
    };

    extractLeftDelta = event => {
        const left = event.pageX;
        const delta = left - this.previousLeft;
        this.previousLeft = left;
        return delta;
    };

    hasDragged = event => {
        if (this.mouseDownX === event.pageX) {
            return false;
        } else {
            this.mouseDownX = event.pageX;
            return true;
        }
    };

    createGroupsForRender() {
        if (!this.props.groups || this.state.groups) {
            return;
        }
        this.setState({
            groups: this.props.groups.map(group => {
                const randomTop = 15 + (Math.random() * 40);
                const groupStyle = {
                    position: 'absolute',
                    left: `${this.mapTimelineToPosition(group.time_period)}px`,
                    top: `${randomTop}vh`,
                    transform: 'translatex(-50%)',
                    zIndex: '50'
                };
                const arrowStyle = {
                    position: 'absolute',
                    top: '11.9vh',
                    left: `${this.mapTimelineToPosition(group.time_period)}px`,
                    height: '48.4vh',
                    width: '1px',
                    backgroundColor: 'var(--darkColor)'
                };
                return (
                    <div key={group.id}>
                        <section style={groupStyle} className="group_on_timeline">
                            <Game { ...group } />
                        </section>
                        <section style={arrowStyle}></section>
                    </div>
                )
            })
        });
    }

    mapPositionToTimeline = event => {
        const currentTimelineScale = 9300 / (window.innerHeight * this.timelineImageQuotient);
        const timelineX = (event.pageX - this.timelineSled.current.offsetLeft) * currentTimelineScale;

        let timelineSection = 0;
        this.timelineMap.forEach((v, i, a) => {
            if (a[i + 1]) {
                if (v[0] <= timelineX && a[i + 1][0] > timelineX) {
                    timelineSection = [ v, a[i + 1] ];
                }
            }
        });
        return Math.floor(timelineSection[0][1] + ((timelineSection[1][1] - timelineSection[0][1]) * ((timelineSection[0][0] - timelineX) / (timelineSection[0][0] - timelineSection[1][0]))));
        };

    mapTimelineToPosition = year => {
        const currentTimelineScale = (window.innerHeight * this.timelineImageQuotient) / 9300;
        let timelineSection = 0;
        this.timelineMap.forEach((v, i, a) => {
            if (a[i + 1]) {
                if (v[1] <= year && a[i + 1][1] > year) {
                    timelineSection = [ v, a[i + 1] ];
                }
            }
        });
        return (timelineSection[0][0] + ((timelineSection[1][0] - timelineSection[0][0]) * ((year - timelineSection[0][1]) / (timelineSection[1][1] - timelineSection[0][1])))) * currentTimelineScale;
        };

    render() {
        return (
            <section style={this.style.expander}>
                <section style={this.style.timelineContainer} >
                    <section
                        ref={this.timelineSled}
                        style={{ ...this.style.timelineSled, left: `-${this.state.timelineLeft}px`, }}
                        onMouseDown={this.onDown}
                        onMouseMove={this.onMove}
                        onMouseUp={this.onUp}
                        onMouseLeave={this.onUp}
                        >
                        <img style={this.style.timeline} src="/images/181031_Timeline_Alpha_9000x900.png" alt="Timeline" />
                        {this.state.groups}
                    </section>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    id: state.user && state.user.id,
    loggedIn: state.loggedIn,
    verified: state.user && state.user.verified,
    groups: state.groups
});

const ConnectedTimeline = connect(mapStateToProps)(Timeline);

export default ConnectedTimeline;
