import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import queryString from 'query-string';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { connect } from 'react-redux';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class ConfirmDialog extends Component {

  //TODO: error handling if facebook response is not ok

  state = {
    open: false,
    loading: false
  };

  baseUrl = 'https://graph.facebook.com/v2.12';

  publishPost = () => {
    this.setState({loading: true})
    this.props.selectedListings.forEach(listing => {
      //promises is an array of promises
      const promises = listing.Images.map(image =>
        fetch(`${this.baseUrl}/me/photos?url=${image.url_570xN}&caption=my caption&published=false&access_token=${this.props.facebookToken}`, {
          method: "POST"
        })
        .then(res => res.json())
        .then(res => res.id)
      )

      const description = listing.description.split('.').filter((el, index) => {
        return index < 3
      }).join('.');

      const tags = listing.tags.filter((el, index) => {
        return index < 3
      }).map(tag => {return '#'+tag.split(' ').join('')}).join(' ');

      let message = {message: description + '\n\n' + tags};
      message = queryString.stringify(message, {encode: true});

      // fetch(`${this.baseUrl}/me/feed
      //   ?message=Hello Kimba!
      //   &attached_media[0]={"media_fbid":"${res.id}"}
      //   &attached_media[1]={"media_fbid":"${res.id}"}
      //   &attached_media[2]={"media_fbid":"${res.id}"}
      //   &access_token=${this.props.facebookToken}`, {
      //   method: "POST"
      // })

      //INSTEAD OF THE SCRIPT ABOVE WE USE THE FOLLOWING
      Promise.all(promises)
      .then (ids => {
        const qs = ids.map((id, index) => `attached_media[${index}]={"media_fbid":"${id}"}`).join('&');

        fetch(`${this.baseUrl}/me/feed?${message}&${qs}&access_token=${this.props.facebookToken}`, {
        //   headers: {
        //   'content-type': 'text/plain'
        // },
          method: "POST"
        })
        .then(res => this.setState({loading: false}))
      })
    })
  }

  handleOpen = () => {
    this.setState({open: true});
    this.publishPost();
  };

  handleClose = () => {
    this.setState({open: false});
  };

  renderResult = () => {

    const RefreshIndicatorStyle = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
        left: -9682
      },
    };

    return this.state.loading
    ? <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
        style={RefreshIndicatorStyle.refresh}
      />
    : <p>DONE IT!</p>
  }

  render() {

    const RaisedButtonStyle = {
      height: 70,
      width: 350,
      alignSelf: "center",
    };

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div className="ConfirmDialog">
        <RaisedButton
          label="ONE CLICK!"
          onClick={this.handleOpen}
          primary={true}
          style={RaisedButtonStyle}
          labelStyle={{ fontSize: '30px'}} />
        <Dialog
          title="Posting..."
          actions={this.state.loading ? null : actions}
          modal={true}
          open={this.state.open}
        >
          {this.renderResult()}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedListings: state.selectedListings,
});

export default connect(mapStateToProps, null)(ConfirmDialog);
