import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import GifGrid from './GifGrid';
import { GiphyService } from '../services';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));

class SearchBar extends Component {
  state = { classes: null, gifs: null };
  componentWillMount() {
    this.setState({ classes: useStyles });
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
    let { classes, gifs } = this.state;
    return (
      <div className={classes.container}>
        <Input
          defaultValue=""
          placeholder="Search for GIFs"
          className={classes.input}
          inputProps={{
            'aria-label': 'Search',
          }}
          fullWidth
        />
        <GifGrid title="Trending" gifs={gifs} />
      </div>
    );
  }
}

export default SearchBar;
