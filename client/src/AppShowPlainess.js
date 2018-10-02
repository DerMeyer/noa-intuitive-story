import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Timeline from './Timeline';
import About from './About';
import Groups from './Groups';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';
import Admin from './Admin';
import ProfilePage from './ProfilePage';
import GroupPage from './GroupPage';

import { checkSignIn } from './actions';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(checkSignIn());
    }

    render() {
        return (
            <BrowserRouter>
                <main>
                    <header className="header flex">
                        <HeaderNavigation />
                        <ProfileNavigation />
                    </header>

                    <Route exact path="/" component={Timeline} />
                    <Route path="/about" component={About} />
                    <Route path="/groups" component={Groups} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/verify" component={Verify} />
                    <Route path="/avira" component={Admin} />
                    <Route
                        path="/profile/:user"
                        render={props => <ProfilePage match={props.match} />}
                    />
                    <Route
                        path="/group/:id"
                        render={props => <GroupPage match={props.match} />}
                    />

                    <Footer />
                </main>
            </BrowserRouter>
        );
    }
}

export default App;
