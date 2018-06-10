import React, { Component } from 'react';
import { connect } from 'react-redux';

const SLED_WIDTH = 253;
const SCROLL_FACTOR = (window.innerWidth * ((SLED_WIDTH - 100) / 200)) / window.innerHeight;

class Timeline extends Component {
    state = {
        hasCapture: false,
        timelineLeft: `-${(SLED_WIDTH - 100) / 2}vw`
    }
    isDragging = false;
    previousLeft = 0;
    componentDidMount() {
        window.addEventListener('scroll', () => this.setTimelinePosition());
        window.scroll(0, window.innerHeight);
    }
    onDown = event => {
        this.isDragging = true;
        event.target.setPointerCapture(event.pointerId);
        this.extractLeftDelta(event);
    };
    onMove = event => {
        event.preventDefault();
        if (!this.isDragging) {
            return;
        }
        const left = this.extractLeftDelta(event);
        window.scroll(0, (- document.getElementById('timeline_sled').offsetLeft - left) / SCROLL_FACTOR);
    };
    onUp = event => this.isDragging = false;
    onGotCapture = event => this.setState({ hasCapture: true });
    onLostCapture = event =>
        this.setState({ hasCapture: false });
    extractLeftDelta = event => {
        const left = event.pageX;
        const delta = left - this.previousLeft;
        this.previousLeft = left;
        return delta;
    };
    setTimelinePosition = () => this.setState({
        timelineLeft: `-${window.scrollY * SCROLL_FACTOR}px`
    })
    render() {
        const { timelineLeft } = this.state;
        const style = {
            timelineSled: {
                position: 'absolute',
                left: timelineLeft,
                top: '13vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '82vh',
                width: `${SLED_WIDTH}vw`
            },
            timeline: {
                width: '260vw'
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
                >
                <img style={style.timeline} src="/images/timeline.jpg" alt="Timeline" id="timeline"/>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedTimeline = connect(mapStateToProps)(Timeline);

export default ConnectedTimeline;
