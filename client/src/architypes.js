import React, { Component } from "react";

const frame = {
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
}

const icon = {
    cursor: 'pointer',
    width: '4vw',
    transitionDuration: '.3s'
}

class Architypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soulsX: Array(5).fill(.5),
            soulsY: Array(5).fill(0)
        };
    }
    componentDidMount() {
        this.animateSouls();
    }
    animateSouls() {
        this.setState({
            soulsX: this.state.soulsX.map((x, i) => this.getTranslateX(this.state.soulsX[i], this.state.soulsX[i - 1], this.state.soulsX[i + 1])),
            soulsY: this.state.soulsY.map(y => this.getTranslateY())
        });
        setTimeout(() => {
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
            <section id="architypes" style={frame}>
                <img src="/images/color_gul.png" alt="Gul" style={{ ...icon, transform: this.getTransformValue(0) }} />
                <img src="/images/color_grun.png" alt="Grun" style={{ ...icon, transform: this.getTransformValue(1) }} />
                <img src="/images/color_vermel.png" alt="Vermel" style={{ ...icon, transform: this.getTransformValue(2) }} />
                <img src="/images/color_bezrechu.png" alt="Bezrechu" style={{ ...icon, transform: this.getTransformValue(3) }} />
                <img src="/images/color_sagol.png" alt="Sagol" style={{ ...icon, transform: this.getTransformValue(4) }} />
            </section>
        );
    }
}

export default Architypes;
