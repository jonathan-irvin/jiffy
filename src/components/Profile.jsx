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

  // onChange(event) {
  //   let state = '';
  //   const name = event.target.name,
  //     value = event.target.value;

  //   switch (name) {
  //     case 'query':
  //       state = Validation.verifyLength(value, 1) ? 'success' : 'error';

  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({
  //     [name]: value,
  //     [name + 'State']: state,
  //     offset: 0,
  //   });

  //   this.getGifs(value);
  // }

  // pageUp() {
  //   const { limit, offset, query } = this.state;
  //   this.setState({ offset: offset + limit });
  //   if (query) {
  //     this.getGifs(query);
  //   } else {
  //     this.getTrendingGifs();
  //   }
  // }

  // pageDown() {
  //   const { limit, offset, query } = this.state;
  //   this.setState({ offset: offset % limit === 0 ? offset - limit : 0 });
  //   if (query) {
  //     this.getGifs(query);
  //   } else {
  //     this.getTrendingGifs();
  //   }
  // }

  // setFirstPage() {
  //   const { query } = this.state;
  //   this.setState({ offset: 0 });
  //   if (query) {
  //     this.getGifs(query);
  //   } else {
  //     this.getTrendingGifs();
  //   }
  // }

  // clearSearch() {
  //   this.setState({ limit: 20, offset: 0, query: null });
  //   this.getTrendingGifs();
  // }

  // getCurrentPage() {
  //   const { limit, offset } = this.state;
  //   const pageNumber = offset / limit + 1;
  //   return pageNumber > 1 ? ' - Page ' + pageNumber : '';
  // }

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
          {/* <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextField
              defaultValue=""
              placeholder="Search for GIFs"
              error={queryState === 'error'}
              helperText={
                queryState === 'error' ? 'Please type something to search' : ''
              }
              className={classes.input}
              inputProps={{
                'aria-label': 'Search',
              }}
              name="query"
              fullWidth
              onChange={this.onChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <Button
              disabled={offset === 0}
              onClick={this.setFirstPage.bind(this)}
            >
              First Page
            </Button>
            <Button disabled={offset === 0} onClick={this.pageDown.bind(this)}>
              Prev Page
            </Button>
            <Button
              disabled={gifs && gifs.length < limit}
              onClick={this.pageUp.bind(this)}
            >
              Next Page
            </Button>
            <Button
              disabled={query === null}
              onClick={this.clearSearch.bind(this)}
              style={query === null ? { color: 'gray' } : { color: 'red' }}
              variant="outlined"
            >
              Reset
            </Button>
          </Grid> */}
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
