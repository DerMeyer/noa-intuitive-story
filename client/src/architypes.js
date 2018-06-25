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
            soulsX: [
                this.getTranslateX(),
                this.getTranslateX(),
                this.getTranslateX(),
                this.getTranslateX(),
                this.getTranslateX()
            ],
            soulsY: [
                this.getTranslateY(),
                this.getTranslateY(),
                this.getTranslateY(),
                this.getTranslateY(),
                this.getTranslateY()
            ]
        };
        this.animateSouls();
    }
    animateSouls() {
        this.setState({
            soulsX: [
                this.getTranslateX(),
                this.getTranslateX(),
                this.getTranslateX(),
                this.getTranslateX(),
                this.getTranslateX()
            ],
            soulsY: [
                this.getTranslateY(),
                this.getTranslateY(),
                this.getTranslateY(),
                this.getTranslateY(),
                this.getTranslateY()
            ]
        });
        setTimeout(() => {
            this.animateSouls();
        }, 200);
    }
    getTranslateX = (x = .5, left = .5, right = .5) => {
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
        return (Math.random() * 10).toFixed(0);
    }
    render() {
        return (
            <section id="architypes" style={frame}>
                <img src="/images/color_gul.png" alt="Gul" style={{ ...icon, transform: `translate(${((.5 - this.state.soulsX[0] * 30)).toFixed(0)}%, ${this.state.soulsY[0]}%)` }} />
            <img src="/images/color_grun.png" alt="Grun" style={{ ...icon, transform: `translate(${((.5 - this.state.soulsX[1] * 30)).toFixed(0)}%, ${this.state.soulsY[1]}%)` }} />
        <img src="/images/color_vermel.png" alt="Vermel" style={{ ...icon, transform: `translate(${((.5 - this.state.soulsX[2] * 30)).toFixed(0)}%, ${this.state.soulsY[2]}%)` }} />
    <img src="/images/color_bezrechu.png" alt="Bezrechu" style={{ ...icon, transform: `translate(${((.5 - this.state.soulsX[3] * 30)).toFixed(0)}%, ${this.state.soulsY[3]}%)` }} />
<img src="/images/color_sagol.png" alt="Sagol" style={{ ...icon, transform: `translate(${((.5 - this.state.soulsX[4] * 30)).toFixed(0)}%, ${this.state.soulsY[4]}%)` }} />
            </section>
        );
    }
}

export default Architypes;
