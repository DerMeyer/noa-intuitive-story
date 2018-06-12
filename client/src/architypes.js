import React, { Component } from "react";

const frame = {
    position: 'absolute',
    top: '1vh',
    left: '27vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10vh',
    width: '46vw',
    borderRadius: '.5vh',
    zIndex: '50'
}

const icon = {
    cursor: 'pointer',
    width: '6vw'
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

// <img src="/images/gul_s.png" alt="Gul" style={icon} />
// <img src="/images/grun_s.png" alt="Grun" style={icon} />
// <img src="/images/vermel_s.png" alt="Vermel" style={icon} />
// <img src="/images/bezrechu_s.png" alt="Bezrechu" style={icon} />
// <img src="/images/sagol_s.png" alt="Sagol" style={icon} />

export default Architypes;
