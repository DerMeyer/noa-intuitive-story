import React, { Component } from 'react';
import { connect } from 'react-redux';

const SLED_WIDTH = 253;

class Timeline extends Component {
    state = {
            hasCapture: false,
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
            timelineLeft: timelineLeft - left
        }));
    };
    onUp = event => {
        window.scroll(0, - document.getElementById('timeline_sled').offsetLeft / this.scrollFactor);
        window.addEventListener('scroll', this.setTimelineLeft);
        this.isDragging = false;
    }
    onGotCapture = event => this.setState({ hasCapture: true });
    onLostCapture = event => this.setState({ hasCapture: false });
    extractLeftDelta = event => {
        const left = event.pageX;
        const delta = left - this.previousLeft;
        this.previousLeft = left;
        return delta;
    };
    render() {
        const { timelineLeft } = this.state;
        const style = {
            timelineSled: {
                position: 'absolute',
                left: `-${timelineLeft}px`,
                top: '13vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '82vh',
                width: `${SLED_WIDTH}vw`,
                transform: this.hasCapture ? 'skew(.5)' : 'skew(1)'
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
                <img id="timeline" style={style.timeline} src="/images/timeline.jpg" alt="Timeline" />
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedTimeline = connect(mapStateToProps)(Timeline);

export default ConnectedTimeline;
