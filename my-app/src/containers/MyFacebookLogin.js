import React, { Component } from "react";
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import * as Actions from '../actions.js';
import config from '../config'

class MyFacebookLogin extends Component {

  baseUrl = 'https://graph.facebook.com/v2.12';

  responseFacebook = (response) => {
    console.log('Facebook response: ',response);
    this.props.addFacebookToken(response.accessToken);
  }

  publishPost = () => {
    fetch(`${this.baseUrl}/me/photos?url=${this.props.selectedListings[0].MainImage.url_570xN}&caption=Hello Kimba!&published=false&access_token=${this.props.facebookToken}`, {
      method: "POST"
    })
    .then(res => res.json())
    .then (res => {
      fetch(`${this.baseUrl}/me/feed?message=Hello Kimba!&attached_media[0]={"media_fbid":"${res.id}"}&access_token=${this.props.facebookToken}`, {
        method: "POST"
      })
    })
    // .then(res => res.json())
    // .then(res => console.log('Fetch POST response: ',res));
  }

  render () {
    if (this.props.selectedListings.length !== 0 && !this.props.facebookToken) {
      return (
        <div className="MyFacebookLogin">
          <FacebookLogin
            appId={config.facebookAppId}
            autoLoad={true}
            fields="name,email,picture"
            scope="publish_actions, user_photos"
            // onClick={componentClicked}
            size="small"
            callback={this.responseFacebook}
          />
        </div>
      )
    } else if (this.props.selectedListings.length !== 0) {
      return (
        <div className="MyFacebookLogin">
          <button onClick={this.publishPost}>Publish</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  selectedListings: state.selectedListings,
  facebookToken: state.facebookToken
});

const mapDispatchToProps = (dispatch) => ({
  addFacebookToken: token => dispatch(Actions.addFacebookToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFacebookLogin);
