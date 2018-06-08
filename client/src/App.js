import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navigation from './navigation';
import Timeline from './timeline';
import Footer from './footer';
import Architypes from './architypes';

const sled_width = 253;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server_message: '',
            timeline_left: `-${(sled_width - 100) / 2}vw`
        }
    }
    componentDidMount() {
        this.serverSaysHi();
        window.addEventListener(
            'scroll',
            () => this.setState({
                timeline_left: `-${window.scrollY * (window.innerWidth * ((sled_width - 100) / 200)) / window.innerHeight}px`
            })
        );
        window.scroll(0, window.innerHeight);
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
        const { timeline_left } = this.state;

        const sledStyle = {
            width: `${sled_width}vw`,
            left: timeline_left
        }

        return (
            <BrowserRouter>
                <main>
                    <Navigation />
                    <section id="timeline_container">
                        <section id="timeline_sled" style={sledStyle}>
                            <Route exact path="/" component={Timeline} />
                            <Route path="/arch" component={Architypes} />
                        </section>
                    </section>
                    <Footer />
                    <p className="server_greeting">
                        {this.state.server_message}
                    </p>
                </main>
            </BrowserRouter>
        );
    }
}

export default App;
