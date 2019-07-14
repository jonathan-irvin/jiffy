import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import { Grid, Typography } from '@material-ui/core';
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
        <div style={{ margin: 12 }}>
          {user ? (
            <Grid container spacing={8} justify="center">
              <Grid item xs={12}>
                <SearchBar user={user} />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              spacing={8}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography align="center">
                  Please sign in to save GIFs!
                </Typography>
              </Grid>
            </Grid>
          )}
        </div>
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
