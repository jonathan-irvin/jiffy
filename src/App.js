import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import NavBar from './components/NavBar';

//Scenes
import Main from './scenes/Main';
import Inventory from './scenes/Inventory';
import Categories from './scenes/Categories';
import CategoryDetails from './scenes/CategoryDetails';

//Auth Interceptor
import axios from 'axios';

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
            path={'/inventory'}
            render={props => user && <Inventory {...props} user={user} />}
          />
          <Route
            path={'/categories'}
            render={props => user && <Categories {...props} user={user} />}
          />

          <Route
            path={'/category/:id'}
            render={props => user && <CategoryDetails {...props} user={user} />}
          />
        </Router>
      </div>
    );
  }
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
// axios.interceptors.request.use(
//   async config => {
//     config.headers.token = await firebaseAppAuth.currentUser.getIdToken();
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
