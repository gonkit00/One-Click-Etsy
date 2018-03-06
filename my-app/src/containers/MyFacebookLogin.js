import React, { Component } from "react";
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
// import queryString from 'query-string';

import config from '../config'
import ConfirmDialog from './ConfirmDialog'
import * as Actions from '../actions.js';

class MyFacebookLogin extends Component {

  //TODO: MyFacebookLogin: when facebook login decide what is the privacy of my posts
  //TODO: MyFacebookLogin: empty the array after publishing
  //TODO: post for Facebook PAGES
  //TODO: recognize &#39; &quot; etc characters in description

  responseFacebook = (response) => {
    this.props.addFacebookToken(response.accessToken)
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
          <p>Share all your selected listings in just...</p>
          <ConfirmDialog facebookToken={this.props.facebookToken} />
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  addFacebookToken: (token) => dispatch(Actions.addFacebookToken(token))
});

const mapStateToProps = (state) => ({
  selectedListings: state.selectedListings,
  facebookToken: state.facebookToken
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFacebookLogin);
