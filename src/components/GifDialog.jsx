import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { GifService, CategoryService } from '../services';

class GifDialogRaw extends React.Component {
  constructor(props) {
    super();
    this.state = { gif: props.gif };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gif !== this.props.gif) {
      this.setState({ gif: this.props.gif });
    }
  }

  handleEntering = () => {};

  handleCancel = () => {
    this.props.onClose(this.props.gif);
  };

  handleOk = () => {
    this.props.onClose(this.state.gif);
  };

  handleChange = (event, user) => {
    this.setState({ user });
  };

  async saveGifToInventory(gif) {
    const { user } = this.props;

    this.setState({ isLoading: true });
    try {
      let response = await GifService.addGifToProfile(user.uid, gif);
      if (response && response.status === 200) {
        let data = response.data;
        console.log('Gif Saved to Profile', data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onError() {
    this.setState({
      url: null,
    });
  }

  render() {
    const { gif, isProfile, ...other } = this.props;
    return (
      <Dialog
        maxWidth="md"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">{gif.title}</DialogTitle>
        <DialogContent>
          <img
            src={gif.images.original.url}
            alt={'Gif'}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </DialogContent>
        <DialogActions>
          {isProfile ? (
            'Category'
          ) : (
            <Button
              onClick={this.saveGifToInventory.bind(this, gif)}
              color="primary"
            >
              Save
            </Button>
          )}
          <Button onClick={this.handleCancel} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GifDialogRaw.propTypes = {
  onClose: PropTypes.func,
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    height: 640,
  },

  playIcon: {
    position: 'flex',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class GifDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  render() {
    const { classes, user, isProfile, gif } = this.props;

    let image =
      gif.images && gif.images.original.height > gif.images.original.width
        ? gif.images.fixed_width_downsampled.url
        : gif.images.fixed_height_downsampled.url;

    // let width =
    //   gif.images &&
    //   gif.images.original.height > gif.images.original.width
    //     ? gif.images.fixed_width_downsampled.width
    //     : gif.images.fixed_height_downsampled.width;
    // let height =
    //   gif.images &&
    //   gif.images.original.height > gif.images.original.width
    //     ? gif.images.fixed_width_downsampled.height
    //     : gif.images.fixed_height_downsampled.height;
    return (
      gif && (
        <div className={classes.root}>
          <img src={image} alt={'Gif'} onClick={this.handleClickListItem} />
          <GifDialogRaw
            classes={{ paper: classes.paper }}
            open={this.state.open}
            onClose={this.handleClose}
            user={user}
            gif={gif}
            isProfile={isProfile}
          />
        </div>
      )
    );
  }
}

GifDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GifDialog);
