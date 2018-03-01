import React, { Component } from "react";
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import * as Actions from '../actions.js';
import config from '../config'

class MyFacebookLogin extends Component {

  responseFacebook = (response) => {
    console.log(response);
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
            // onClick={componentClicked}
            callback={this.responseFacebook}
            size='small'
          />
        </div>
      )
    } else {
      return (
        <div className="MyFacebookLogin">
        </div>
      )
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
