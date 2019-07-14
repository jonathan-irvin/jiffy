import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GifGrid from './GifGrid';
import { GifService } from '../services';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));

class Profile extends Component {
  state = {
    classes: null,
    gifs: null,
    title: 'My GIFs',
    limit: 20,
    offset: 0,
    query: null,
    isLoading: true,
  };
  componentWillMount() {
    this.setState({ classes: useStyles });
  }
  componentDidMount() {
    this.getGifs();
  }

  async getGifs() {
    let { user } = this.props;

    this.setState({ isLoading: true });
    try {
      let response = user && (await GifService.getAllGifs(user.uid));
      if (response && response.status === 200) {
        let data = response.data;
        this.setState({
          gifs: data,
          title: 'Showing My GIFs',
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let {
      classes,
      gifs,
      title,

      isLoading,
    } = this.state;
    return (
      <div className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {isLoading ? (
              'LOADING...'
            ) : (
              <GifGrid
                title={title}
                gifs={gifs}
                user={this.props.user}
                isProfile
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;
