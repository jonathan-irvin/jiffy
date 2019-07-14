import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import LazyLoad from 'react-lazy-load';
import { GifService } from '../services';
import GifDialog from './GifDialog';
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

  render() {
    let { classes } = this.state;
    let { gifs, user, width, isProfile } = this.props;
    if (isProfile) {
      gifs = gifs.map(gif => gif.gifData);
    }
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
                return (
                  <GridListTile key={gif.id} cols={gif.cols || 1}>
                    <GifDialog gif={gif} isProfile={isProfile} user={user} />
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
