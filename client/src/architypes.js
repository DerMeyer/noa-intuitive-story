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
    width: '4vw'
}

class Architypes extends Component {
    render() {
        return (
            <section style={frame}>
                <img src="/images/color_gul.png" alt="Gul" style={icon} />
                <img src="/images/color_grun.png" alt="Grun" style={icon} />
                <img src="/images/color_vermel.png" alt="Vermel" style={icon} />
                <img src="/images/color_bezrechu.png" alt="Bezrechu" style={icon} />
                <img src="/images/color_sagol.png" alt="Sagol" style={icon} />
            </section>
        );
    }
}

export default Architypes;
