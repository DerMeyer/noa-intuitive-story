import React, { Component } from 'react';
import { connect } from 'react-redux';

const SLED_WIDTH = 253;
const TIMELINE_WIDTH = 260;
const TIMELINE_MAP = [
    [0, -80000],
    [45, -70000],
    [90, -60000],
    [133, -50000],
    [178, -40000],
    [222, -30000],
    [267, -20000],
    [310, -10000],
    [343, -9000],
    [376, -8000],
    [410, -7000],
    [443, -6000],
    [477, -5000],
    [510, -4800],
    [543, -4600],
    [576, -4400],
    [609, -4200],
    [642, -4000],
    [675, -3800],
    [708, -3600],
    [741, -3400],
    [775, -3200],
    [807, -3000],
    [840, -2800],
    [873, -2600],
    [906, -2400],
    [939, -2200],
    [972, -2000],
    [1005, -1800],
    [1038, -1600],
    [1072, -1400],
    [1105, -1200],
    [1138, -1000],
    [1171, -900],
    [1204, -800],
    [1237, -700],
    [1270, -600],
    [1304, -500],
    [1336, -400],
    [1369, -300],
    [1403, -200],
    [1436, -100],
    [1469, 0],
    [1520, 100],
    [1576, 200],
    [1632, 300],
    [1687, 400],
    [1743, 500],
    [1802, 600],
    [1858, 700],
    [1914, 800],
    [1968, 900],
    [2024, 1000],
    [2078, 1100],
    [2134, 1200],
    [2189, 1300],
    [2245, 1400],
    [2302, 1500],
    [2360, 1600],
    [2416, 1700],
    [2472, 1800],
    [2528, 1900],
    [2583, 1950],
    [2639, 2000],
    [2672, 2100],
    [2706, 2200],
    [2739, 2300],
    [2773, 2400],
    [2806, 2500],
    [2873, 3000],
    [2958, 4000],
    [2980, 5000]
]

class Timeline extends Component {
    state = {
        timelineLeft: window.innerWidth * (SLED_WIDTH - 100) / 200
    }
    isDragging = false;
    previousLeft = 0;
    scrollFactor = window.innerWidth / window.innerHeight * ((SLED_WIDTH - 100) / 200);
    componentDidMount() {
        window.scroll(0, window.innerHeight);
        window.addEventListener('scroll', this.setTimelineLeft);
    }
    setTimelineLeft = () => {
        this.setState({
            timelineLeft: window.scrollY * this.scrollFactor
        })
    }
    onDown = event => {
        event.target.setPointerCapture(event.pointerId);
        window.removeEventListener('scroll', this.setTimelineLeft);
        this.isDragging = true;
        this.scrollFactor = window.innerWidth / window.innerHeight * ((SLED_WIDTH - 100) / 200);
        this.extractLeftDelta(event);
    };
    onMove = event => {
        event.preventDefault();
        if (!this.isDragging) {
            return;
        }
        const left = this.extractLeftDelta(event);
        this.setState(({ timelineLeft }) => ({
            timelineLeft: timelineLeft < window.innerWidth * (SLED_WIDTH - 100) / 100 ? timelineLeft - left : timelineLeft
        }));
    };
    onUp = () => {
        window.scroll(0, - document.getElementById('timeline_sled').offsetLeft / this.scrollFactor);
        window.addEventListener('scroll', this.setTimelineLeft);
        this.isDragging = false;
    }
    extractLeftDelta = event => {
        const left = event.pageX;
        const delta = left - this.previousLeft;
        this.previousLeft = left;
        return delta;
    };
    mapPixelToTimeline = event => {
        const currentTimelineScale = 2980 / document.getElementById('timeline_sled').offsetWidth;
        const timelineX = (event.pageX - document.getElementById('timeline_sled').offsetLeft) * currentTimelineScale;
        let timelineSection;
        TIMELINE_MAP.forEach((v, i, a) => {
            if (a[i + 1]) {
                if (v[0] < timelineX && a[i + 1][0] > timelineX) {
                    timelineSection = [ v, a[i + 1] ];
                }
            }
        });
        const exactYear = Math.floor(timelineSection[0][1] + ((timelineSection[1][1] - timelineSection[0][1]) * ((timelineSection[0][0] - timelineX) / (timelineSection[0][0] - timelineSection[1][0]))));
        console.log(exactYear);
        return exactYear;
    }
    render() {
        const { timelineLeft } = this.state;
        const style = {
            timelineSled: {
                position: 'absolute',
                left: `-${timelineLeft}px`,
                top: '11vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '82vh',
                width: `${SLED_WIDTH}vw`
            },
            timeline: {
                width: `${TIMELINE_WIDTH}vw`
            }
        }
        return (
            <section
                id="timeline_sled"
                style={style.timelineSled}
                onPointerDown={this.onDown}
                onPointerMove={this.onMove}
                onPointerUp={this.onUp}
                onPointerCancel={this.onUp}
                onGotPointerCapture={this.onGotCapture}
                onLostPointerCapture={this.onLostCapture}
                onClick={this.mapPixelToTimeline}
                >
                <img id="timeline" style={style.timeline} src="/images/timeline.jpg" alt="Timeline" />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedTimeline = connect(mapStateToProps)(Timeline);

export default ConnectedTimeline;
