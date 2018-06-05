import React, { Component } from 'react';
import './App.css';

import Navigation from './navigation';
import Timeline from './timeline';
import Footer from './footer';

import Architypes from './architypes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server_message: ''
        }
    }
    componentDidMount() {
        this.serverSaysHi();
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
                <Timeline />
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
