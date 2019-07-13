import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import { Grid } from '@material-ui/core';
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div>
        <NavBar
          signInWithGoogle={signInWithGoogle}
          signOut={signOut}
          user={user}
          firebaseAppAuth={firebaseAppAuth}
        />
        <Grid container spacing={8} justify="center" style={{ margin: 24 }}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
        </Grid>
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
