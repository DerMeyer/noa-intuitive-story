import React, { Component } from 'react';
import { connect } from 'react-redux';

import Group from './Group';

import { setMessage, getGroups, getHistory, createHistory } from './actions';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.timelineImageQuotient = 4.4383;
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
                top: '20vh',
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
                height: '60vh',
                transform: 'scaleX(1.028)'
            },
            historyCreatorH3: {
                fontSize: '3vh',
                lineHeight: '1'
            },
            verifyP: {
                margin: '0'
            },
            historyCreatorYear: {
                display: 'inline-block',
                fontFamily: 'NTR, sans-serif',
                fontSize: '2vh',
                height: '3vh',
                width: '6vw',
                paddingLeft: '.2vw',
                marginBottom: '1vh'
            },
            historyCreatorInput: {
                fontFamily: 'NTR, sans-serif',
                fontSize: '2vh',
                height: '3vh',
                width: '12vw',
                paddingLeft: '.2vw',
                marginBottom: '1vh'
            },
            historyCreatorButtonContainer: {
                display: 'flex',
                justifyContent: 'space-between',
                width: '12vw',
                marginTop: '.5vh'
            },
            historyCreatorButton: {
                cursor: 'pointer',
                fontFamily: 'NTR, sans-serif',
                fontSize: '2vh',
                width: '5.5vw',
                borderRadius: '.5vh',
                color: 'white',
                backgroundColor: 'gray'
            }
        };
        this.timelineMap = [
            [0, -80000], [45, -70000], [90, -60000], [133, -50000], [178, -40000], [222, -30000], [267, -20000], [310, -10000], [343, -9000], [376, -8000], [410, -7000],
            [443, -6000], [477, -5000], [510, -4800], [543, -4600], [576, -4400], [609, -4200], [642, -4000], [675, -3800], [708, -3600], [741, -3400], [775, -3200],
            [807, -3000], [840, -2800], [873, -2600], [906, -2400], [939, -2200], [972, -2000], [1005, -1800], [1038, -1600], [1072, -1400], [1105, -1200], [1138, -1000],
            [1171, -900], [1204, -800], [1237, -700], [1270, -600], [1304, -500], [1336, -400], [1369, -300], [1403, -200], [1436, -100], [1469, 0], [1520, 100],
            [1576, 200], [1632, 300], [1687, 400], [1743, 500], [1802, 600], [1858, 700], [1914, 800], [1968, 900], [2024, 1000], [2078, 1100], [2134, 1200], [2189, 1300],
            [2245, 1400], [2302, 1500], [2360, 1600], [2416, 1700], [2472, 1800], [2528, 1900], [2583, 1950], [2639, 2000], [2672, 2100], [2706, 2200], [2739, 2300], [2773, 2400],
            [2806, 2500], [2873, 3000], [2958, 4000], [2980, 5000]
        ];
        this.timelineSled = React.createRef();
        this.isDragging = false;
        this.previousLeft = 0;
        this.mouseDownX = 0;
    }
    componentDidMount() {
        this.scrollFactor = ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth) / (2 * window.innerHeight);
        window.scroll(0, window.innerHeight);
        this.setTimelineLeft();
        this.props.dispatch(getGroups());
        this.props.dispatch(getHistory());
    }
    componentDidUpdate() {
        this.scrollFactor = ((window.innerHeight * this.timelineImageQuotient) - window.innerWidth) / (2 * window.innerHeight);
        this.createGroupsForRender();
        this.createHistoryForRender();
    }
    componentWillUnmount() {
        clearTimeout(this.setTimeoutID);
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
    }
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
        if (!this.hasDragged(event)) {
            this.addHistoryEntry(event);
        }
    }
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
    }
    createGroupsForRender() {
        if (!this.props.groups || this.state.groups) {
            return;
        }
        this.setState({
            groups: this.props.groups.map(group => {
                const randomTop = 10 + (Math.random() * 12);
                const groupStyle = {
                    position: 'absolute',
                    left: `${this.mapTimelineToPosition(group.time_period)}px`,
                    top: `${randomTop}vh`,
                    transform: 'translatex(-50%)'
                }
                const arrowStyle = {
                    position: 'absolute',
                    top: '15vh',
                    left: '7.5vh',
                    height: `${26 - randomTop}vh`,
                    width: '.2vh',
                    backgroundColor: 'rgb(120, 120, 120)'
                }
                return (
                    <section key={group.id} style={groupStyle} className="group_on_timeline">
                        <Group { ...group } />
                        <section style={arrowStyle}></section>
                    </section>
                )
            })
        });
    }
    createHistoryForRender() {
        if (!this.props.history) {
            return;
        }
        if (this.props.history && this.state.history) {
            if (this.props.history.length === this.state.history.length) {
                return;
            }
        }
        this.setState({
            history: this.props.history.map(entry => {
                const randomTop = 46 + (Math.random() * 16);
                const historyStyle = {
                    left: `${this.mapTimelineToPosition(entry.time_period)}px`,
                    top: `${randomTop}vh`,
                    transform: 'translatex(-50%)'
                }
                const arrowStyle = {
                    position: 'absolute',
                    top: `${45 - randomTop}vh`,
                    left: '7.5vh',
                    height: `${randomTop - 45}vh`,
                    width: '.2vh',
                    backgroundColor: 'rgb(120, 120, 120)'
                }
                return (
                    <section key={`historyEntry_${entry.id}`} style={historyStyle} className="history-on-timeline">
                        <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="history-link-on-timeline"
                        >
                            <p>{entry.name}</p>
                            <p>{entry.time_period}</p>
                            <p>{entry.place}</p>
                        </a>
                        <section style={arrowStyle}></section>
                    </section>
                )
            })
        });
    }
    addHistoryEntry = event => {
        if (event.clientY < window.innerHeight * .53 || !this.props.loggedIn) {
            return;
        } else if (this.state.newHistoryEntry) {
            this.cancelHistoryEntry();
        } else {
            this.setState({
                newHistoryEntry: true,
                addHistoryStyle: {
                    position: 'absolute',
                    top: `${event.clientY - window.innerHeight * .12}px`,
                    left: `${event.pageX - this.timelineSled.current.offsetLeft}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1vh',
                    border: '.2vh solid lightgray',
                    borderRadius: '1vh',
                    backgroundColor: 'whitesmoke',
                    transform: 'translate(-50%, -85%)'
                },
                year: this.mapPositionToTimeline(event)
            });
        }
    }
    cancelHistoryEntry = () => {
        this.setState({
            newHistoryEntry: false,
            addHistoryStyle: {}
        });
    }
    createHistoryEntry = event => {
        if (event.type !== 'click' && event.keyCode !== 13) {
            return;
        }
        if (!this.props.verified) {
            return this.props.dispatch(setMessage('You need to verify your account before you can add history entries.'));
        }
        event.preventDefault();
        if (this.state.year && this.state.name && this.state.location && this.state.link) {
            const { name, year, location, link, comment } = this.state;
            this.props.dispatch(createHistory(this.props.id, name, year, location, link, comment));
            this.setState({
                newHistoryEntry: false,
                addHistoryStyle: {},
                year: '',
                name: '',
                location: '',
                link: '',
                comment: ''
            });
        } else {
            this.props.dispatch(setMessage('Please fill out every field to add a history entry.'));
        }
    }
    mapPositionToTimeline = event => {
        const currentTimelineScale = 2980 / (window.innerHeight * this.timelineImageQuotient);
        const timelineX = (event.pageX - this.timelineSled.current.offsetLeft) * currentTimelineScale;
        let timelineSection;
        this.timelineMap.forEach((v, i, a) => {
            if (a[i + 1]) {
                if (v[0] <= timelineX && a[i + 1][0] > timelineX) {
                    timelineSection = [ v, a[i + 1] ];
                }
            }
        });
        const exactYear = Math.floor(timelineSection[0][1] + ((timelineSection[1][1] - timelineSection[0][1]) * ((timelineSection[0][0] - timelineX) / (timelineSection[0][0] - timelineSection[1][0]))));
        return exactYear;
    }
    mapTimelineToPosition = year => {
        const currentTimelineScale = (window.innerHeight * this.timelineImageQuotient) / 2980;
        let timelineSection;
        this.timelineMap.forEach((v, i, a) => {
            if (a[i + 1]) {
                if (v[1] <= year && a[i + 1][1] > year) {
                    timelineSection = [ v, a[i + 1] ];
                }
            }
        });
        const exactPosition = (timelineSection[0][0] + ((timelineSection[1][0] - timelineSection[0][0]) * ((year - timelineSection[0][1]) / (timelineSection[1][1] - timelineSection[0][1])))) * currentTimelineScale;
        return exactPosition;
    }
    compileData = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    emptyField = event => {
        this.setState({
            [event.target.name]: '',
            [`${event.target.name}Red`]: {}
        });
    }
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
                        <img style={this.style.timeline} src="/images/180919_Timeline_alpha.png" alt="Timeline" />
                        {this.state.groups}
                        <img className="our-great-gif" src="/images/victim.gif" als="ljkasdfgdlhj" />
                        {this.state.newHistoryEntry && <section style={this.state.addHistoryStyle} onMouseDown={e => e.stopPropagation()} onMouseUp={e => e.stopPropagation()}>
                            <h3 style={this.style.historyCreatorH3}>Add a history event</h3>
                            {!this.props.verified && <p style={this.style.verifyP}>Verify your account to add history entries</p>}
                            <div>
                                <p style={this.style.historyCreatorYear}>Year</p>
                                <input
                                    style={this.style.historyCreatorYear}
                                    name="year"
                                    type="text"
                                    value={this.state.year}
                                    placeholder="event year"
                                    onChange={this.compileData}
                                    onKeyDown={this.createHistoryEntry}
                                    />
                            </div>
                            <input
                                style={this.style.historyCreatorInput}
                                name="name"
                                type="text"
                                value={this.state.name}
                                placeholder="event name"
                                onFocus={this.emptyField}
                                onChange={this.compileData}
                                onKeyDown={this.createHistoryEntry}
                                />
                            <input
                                style={this.style.historyCreatorInput}
                                name="location"
                                type="text"
                                value={this.state.location}
                                placeholder="event location"
                                onFocus={this.emptyField}
                                onChange={this.compileData}
                                onKeyDown={this.createHistoryEntry}
                                />
                            <input
                                style={this.style.historyCreatorInput}
                                name="link"
                                type="text"
                                value={this.state.link}
                                placeholder="external link"
                                onFocus={this.emptyField}
                                onChange={this.compileData}
                                onKeyDown={this.createHistoryEntry}
                                />
                            <input
                                style={this.style.historyCreatorInput}
                                name="comment"
                                type="text"
                                value={this.state.comment}
                                placeholder="comment (optional)"
                                onFocus={this.emptyField}
                                onChange={this.compileData}
                                onKeyDown={this.createHistoryEntry}
                                />
                            <section style={this.style.historyCreatorButtonContainer}>
                                <button style={this.style.historyCreatorButton} onClick={this.cancelHistoryEntry}>Cancel</button>
                                <button style={this.style.historyCreatorButton} onClick={this.createHistoryEntry}>Add</button>
                            </section>
                        </section>}
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
    groups: state.groups,
    history: state.history
});

const ConnectedTimeline = connect(mapStateToProps)(Timeline);

export default ConnectedTimeline;
