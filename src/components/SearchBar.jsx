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
  state = {
    classes: null,
    gifs: null,
    title: 'Trending',
    limit: 20,
    offset: 0,
  };
  componentWillMount() {
    this.setState({ classes: useStyles });
    this.getTrendingGifs(20, 0);
  }

  async getGifs(query) {
    let { limit, offset } = this.state;
    try {
      let response = await GiphyService.gifSearch({ q: query, limit, offset });
      if (response && response.status === 200) {
        let data = response.data && response.data.data;
        this.setState({ gifs: data, title: query + ' GIFs' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTrendingGifs() {
    let { limit, offset } = this.state;
    try {
      let response = await GiphyService.getTrending({ limit, offset });
      if (response && response.status === 200) {
        let data = response.data && response.data.data;
        this.setState({ gifs: data, title: 'Trending' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  onChange(event) {
    let state = '';
    const name = event.target.name,
      value = event.target.value;

    this.setState({
      [name]: value,
    });

    this.getGifs(value);
  }

  render() {
    let { classes, gifs, title } = this.state;
    return (
      <div className={classes.container}>
        <Input
          defaultValue=""
          placeholder="Search for GIFs"
          className={classes.input}
          inputProps={{
            'aria-label': 'Search',
          }}
          name="query"
          fullWidth
          onChange={this.onChange.bind(this)}
        />
        <GifGrid title={title} gifs={gifs} />
      </div>
    );
  }
}

export default SearchBar;
