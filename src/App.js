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
  // state = {
  //   gifs: null,
  // };

  // componentWillMount() {
  //   this.getTrendingGifs(20, 0);
  // }

  // async getGifs(query, limit, offset) {
  //   try {
  //     let response = await GiphyService.gifSearch({ q: query, limit, offset });
  //     if (response && response.status === 200) {
  //       let data = response.data && response.data.data;
  //       this.setState({ gifs: data });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async getTrendingGifs(limit, offset) {
  //   try {
  //     let response = await GiphyService.getTrending({ limit, offset });
  //     if (response && response.status === 200) {
  //       let data = response.data && response.data.data;
  //       this.setState({ gifs: data });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    // let { gifs } = this.state;
    // let userId = user && user.uid;
    // console.log(gifs);

    return (
      <div>
        <NavBar
          signInWithGoogle={signInWithGoogle}
          signOut={signOut}
          user={user}
          firebaseAppAuth={firebaseAppAuth}
        />
        <Grid container spacing={8} justify="center" style={{ marginTop: 24 }}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
        </Grid>
      </div>

      // {/* {gifs &&
      //   gifs.map(gif => {
      //     let image = gif.images && gif.images.downsized_medium.url;
      //     return <img src={image} alt={gif.title} />;
      //   })} */}
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
