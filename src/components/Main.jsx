import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { Grid, Typography } from '@material-ui/core';

export default class Main extends Component {
  render() {
    const { user } = this.props;
    return (
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
    );
  }
}
