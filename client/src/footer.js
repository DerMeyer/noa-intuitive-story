import React, { Component } from "react";

const frame = {
    position: 'absolute',
    top: '95vh',
    left: '0',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '5vh',
    width: '100vw',
    padding: '0 3vw'
}

const p = {
    fontSize: '1vw',
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
