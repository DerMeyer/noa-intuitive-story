import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navigation from './navigation';
import ProfileMenu from './profile-menu';
import Timeline from './timeline';
import Footer from './footer';
import GroupComponent from './group-component';

import { showNavigation, hideNavigation } from './actions';

class App extends Component {
    state = {
        server_message: ''
    }
    componentDidMount() {
        this.props.dispatch(hideNavigation());
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
    toggleNavigation = () => {
        if (this.props.navigation && this.props.navigation.left === '0') {
            this.props.dispatch(hideNavigation());
        } else {
            this.props.dispatch(showNavigation());
        }
    }
    render() {
        const style = {
            logoP: {
                fontSize: '3vh',
                padding: '1vw',
                border: '.1vw solid whitesmoke',
                borderRadius: '.5vw',
                color: 'white',
                backgroundColor: 'rgb(211, 59, 122)'
            }
        }
        return (
            <BrowserRouter>
                <main>
                    <section className="logo" onClick={this.toggleNavigation} >
                        <p style={style.logoP}>Intuitive Story</p>
                    </section>
                    <Navigation />
                    <ProfileMenu />
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
