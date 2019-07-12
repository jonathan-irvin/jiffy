import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import logo from './logo.svg';
import './App.css';
import { GiphyService } from './services';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = {
    gifs: null,
  };

  componentWillMount() {
    this.getTrendingGifs(20, 0);
  }

  async getGifs(query, limit, offset) {
    try {
      let response = await GiphyService.gifSearch({ q: query, limit, offset });
      if (response && response.status === 200) {
        let data = response.data && response.data.data;
        this.setState({ gifs: data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTrendingGifs(limit, offset) {
    try {
      let response = await GiphyService.getTrending({ limit, offset });
      if (response && response.status === 200) {
        let data = response.data && response.data.data;
        this.setState({ gifs: data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    let { gifs } = this.state;
    let userId = user && user.uid;
    console.log(gifs);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}

          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          )}

          {gifs &&
            gifs.map(gif => {
              let image = gif.images && gif.images.downsized_medium.url;
              return <img src={image} alt={gif.title} />;
            })}
        </header>
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
