import React, { Component } from 'react';
import './App.css';

import Navigation from './navigation';
import Timeline from './timeline';
import Footer from './footer';
import Architypes from './architypes';

const sledWidth = 253;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server_message: ''
        }
    }
    componentDidMount() {

        this.serverSaysHi();

        const sled = document.getElementById('timeline_sled');
        window.addEventListener(
            'scroll',
            () => sled.style.left = `-${window.scrollY * (window.innerWidth * ((sledWidth - 100) / 200)) / window.innerHeight}px`
        );
        setTimeout(() => {
            window.scroll(0, window.innerHeight);
        }, 50);
    }
    serverSaysHi = async () => {
        try {
            const response = await fetch('/api/hello');
            const body = await response.json();
            this.setState({
                server_message: body.message
            });
        } catch (err) {
            console.log(err);
            this.setState({
                server_message: 'The server did not respond.'
            });
        }
    }
    render() {
        return (
            <main>
                <Navigation />
                <section id="timeline_container">
                    <section id="timeline_sled" style={{width: `${sledWidth}vw`}}>
                        <Timeline />
                    </section>
                </section>
                <Footer />
                <Architypes />
                <p className="server_greeting">
                    {this.state.server_message}
                </p>
            </main>
        );
    }
}

export default App;
