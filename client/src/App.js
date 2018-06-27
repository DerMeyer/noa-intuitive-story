import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navigation from './navigation';
import ProfileMenu from './profile-menu';
import Timeline from './timeline';
import Footer from './footer';
import GroupComponent from './group-component';

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
        const style = {
            logo: {
                width: '5vw'
            }
        }
        return (
            <BrowserRouter>
                <main>
                    <section className="logo" onClick={this.toggleNavigation} >
                        <img style={style.logo} src="images/logo.png" alt="Galaxy Logo"/>
                    </section>
                    <Route exact path="/" component={Navigation} />
                    <Route exact path="/" component={ProfileMenu} />
                    <Route exact path="/" component={Timeline} />
                    <Route path="/group" component={GroupComponent} />
                    <Footer />
                </main>
            </BrowserRouter>
        );
    }
}

// <p className="server_greeting">
//     {this.state.server_message}
// </p>

const mapStateToProps = state => state;

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
