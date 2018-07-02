import React, { Component } from "react";

class Architypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soulsX: Array(5).fill(.5),
            soulsY: Array(5).fill(0)
        };
        this.style = {
            frame: {
                position: 'fixed',
                top: '13vh',
                left: '39vw',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '10vh',
                width: '22vw',
                borderRadius: '.5vh',
                zIndex: '50'
            },
            soul: {
                cursor: 'pointer',
                width: '4vw',
                transitionDuration: '.3s'
            }
        };
    }
    componentDidMount() {
        this.animateSouls();
    }
    componentWillUnmount() {
        clearTimeout(this.setTimeoutID);
    }
    animateSouls() {
        this.setState({
            soulsX: this.state.soulsX.map((x, i) => this.getTranslateX(this.state.soulsX[i], this.state.soulsX[i - 1], this.state.soulsX[i + 1])),
            soulsY: this.state.soulsY.map(y => this.getTranslateY())
        });
        this.setTimeoutID = setTimeout(() => {
            this.animateSouls();
        }, 200);
    }
    getTranslateX(x, left = .5, right = .5) {
        const leftPush = (left - .5) > 0 ? left - .5 : 0
        const rightPush = (.5 - right) > 0 ? .5 - right : 0
        const randomX = () => {
            const rX = Math.random();
            if (rX > leftPush && rX < (1 - rightPush)) {
                return rX;
            } else {
                return randomX();
            }
        }
        return randomX();
    }
    getTranslateY() {
        return Math.random() * 10;
    }
    getTransformValue(i) {
        return `translate(${((.5 - this.state.soulsX[i] * 30)).toFixed(0)}%, ${this.state.soulsY[i].toFixed(0)}%)`
    }
    render() {
        return (
            <section style={this.style.frame} id="architypes">
                <img style={{ ...this.style.soul, transform: this.getTransformValue(0) }} src="/images/color_gul.png" alt="Gul" />
                <img style={{ ...this.style.soul, transform: this.getTransformValue(1) }} src="/images/color_grun.png" alt="Grun" />
                <img style={{ ...this.style.soul, transform: this.getTransformValue(2) }} src="/images/color_vermel.png" alt="Vermel" />
                <img style={{ ...this.style.soul, transform: this.getTransformValue(3) }} src="/images/color_bezrechu.png" alt="Bezrechu" />
                <img style={{ ...this.style.soul, transform: this.getTransformValue(4) }} src="/images/color_sagol.png" alt="Sagol" />
            </section>
        );
    }
}

export default Architypes;
