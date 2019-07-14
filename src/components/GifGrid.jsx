import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import LazyLoad from 'react-lazy-load';
import { GifService } from '../services';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

class GifGrid extends Component {
  state = { classes: null };
  componentWillMount() {
    this.setState({ classes: useStyles });
  }

  async saveGifToInventory(gif) {
    const { user } = this.props;
    this.setState({ isLoading: true });
    try {
      let response = await GifService.addGifToProfile({
        userId: user.uid,
        gifData: gif,
      });
      if (response && response.status === 200) {
        let data = response.data;
        console.log('Gif Saved to Profile', data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let { classes } = this.state;
    let { gifs, width } = this.props;
    const getGridListCols = () => {
      if (isWidthUp('xl', width)) {
        return 6;
      }

      if (isWidthUp('lg', width)) {
        return 5;
      }

      if (isWidthUp('md', width)) {
        return 3;
      }

      if (isWidthUp('sm', width)) {
        return 2;
      }

      return 2;
    };
    return (
      <div style={{ marginTop: 24 }}>
        <Typography variant="h5">{this.props.title}</Typography>

        {gifs && gifs.length ? (
          <div className={classes.root}>
            <GridList
              cellHeight={'auto'}
              className={classes.gridList}
              cols={getGridListCols()}
            >
              {gifs.map(gif => {
                let image =
                  gif.images &&
                  gif.images.original.height > gif.images.original.width
                    ? gif.images.fixed_width_downsampled.url
                    : gif.images.fixed_height_downsampled.url;

                let width =
                  gif.images &&
                  gif.images.original.height > gif.images.original.width
                    ? gif.images.fixed_width_downsampled.width
                    : gif.images.fixed_height_downsampled.width;
                let height =
                  gif.images &&
                  gif.images.original.height > gif.images.original.width
                    ? gif.images.fixed_width_downsampled.height
                    : gif.images.fixed_height_downsampled.height;
                return (
                  <GridListTile key={gif.image} cols={gif.cols || 1}>
                    <Button onClick={this.saveGifToInventory.bind(this)}>
                      <LazyLoad height={height} width={width}>
                        <img src={image} alt={gif.title} />
                      </LazyLoad>
                    </Button>
                  </GridListTile>
                );
              })}
            </GridList>
          </div>
        ) : (
          <Typography variant="h5" style={{ marginTop: 50 }}>
            No Results
          </Typography>
        )}
      </div>
    );
  }
}
export default withWidth()(GifGrid);
