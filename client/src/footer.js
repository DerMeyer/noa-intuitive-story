import React, { Component } from "react";

const frame = {
    position: 'fixed',
    top: '95vh',
    left: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5vh',
    width: '100vw',
    padding: '0 3vw'
}

const p = {
    position: 'relative',
    fontSize: '.9vw',
    marginRight: '2vw',
    color: 'gray',
    zIndex: '75'
}

const div = {
    display: 'flex'
}

class Footer extends Component {
    render() {
        return (
            <section style={frame}>
                <p style={p}>&copy; Noa Golan</p>
                <div style={div}>
                    <p style={p}>Impressum</p>
                    <p style={p}>Contact</p>
                </div>
            </section>
        );
    }
}

export default Footer;
