import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Main from './components/Main';
import Profile from './components/Profile';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.forceUpdate();
    }
  }
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div>
        <Router>
          <NavBar
            signInWithGoogle={signInWithGoogle}
            signOut={signOut}
            user={user}
            firebaseAppAuth={firebaseAppAuth}
          />

          <Route
            path={'/'}
            exact
            render={props => <Main {...props} user={user} />}
          />
          <Route
            path={'/profile'}
            render={props => user && <Profile {...props} user={user} />}
          />
          <Route
            path={'/categories'}
            render={props => user && <Main {...props} user={user} />}
          />
        </Router>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
