import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import queryString from 'query-string';


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class ConfirmDialog extends React.Component {

  state = {
    open: false,
  };

  baseUrl = 'https://graph.facebook.com/v2.12';

  publishPost = () => {
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

        fetch(`${this.baseUrl}/me/feed?${message}&${qs}&access_token=${this.props.facebookToken}`,
          {
            method: "POST"
          })
          .then(res => console.log('Facebook Post result: ',res.ok))
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

  render() {

    const RaisedButtonStyle = {
      height: 70,
      width: 350,
      alignSelf: "center",
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton
          label="IT'S HANDY!"
          onClick={this.handleOpen}
          primary={true}
          style={RaisedButtonStyle}
          labelStyle={{ fontSize: '30px'}} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }
}


{/* <RaisedButton onClick={this.publishPost} label="IT'S HANDY!" primary={true} style={style} labelStyle={{ fontSize: '30px'}} /> */}
