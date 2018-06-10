import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navigation from './navigation';
import Timeline from './timeline';
import Footer from './footer';
import Architypes from './architypes';

class App extends Component {
    state = {
        server_message: ''
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
            <BrowserRouter>
                <main>
                    <Navigation />
                    <Route exact path="/" component={Timeline} />
                    <Route path="/arch" component={Architypes} />
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
