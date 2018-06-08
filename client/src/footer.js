import React, { Component } from "react";

const frame = {
    position: 'absolute',
    top: '95vh',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    height: '5vh',
    width: '100vh',
    padding: '0 5vw'
}

const p = {
    marginRight: '2vw',
    color: 'gray'
}

class Footer extends Component {
    render() {
        return (
            <section style={frame}>
                <p style={p}>&copy; Noa Golan</p>
                <p style={p}>Impressum</p>
                <p style={p}>Contact</p>
            </section>
        );
    }
}

export default Footer;
