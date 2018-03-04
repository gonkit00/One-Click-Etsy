import React, { Component } from "react";
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import RaisedButton from 'material-ui/RaisedButton';
// import queryString from 'query-string';

import config from '../config'
import ConfirmDialog from '../components/ConfirmDialog'

class MyFacebookLogin extends Component {

  //TODO: MyFacebookLogin: when facebook login decide what is the privacy of my posts
  //TODO: MyFacebookLogin: empty the array after publishing
  //TODO: post for Facebook PAGES
  //TODO: recognize &#39; &quot; etc characters in description

  state = {facebookToken:undefined}

  responseFacebook = (response) => {
    this.setState({facebookToken:response.accessToken})
  }

  render () {

    if (this.props.selectedListings.length !== 0 && !this.state.facebookToken) {

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
          <p>Share all your listings in just one click...</p>
          {/* <RaisedButton onClick={this.publishPost} label="IT'S HANDY!" primary={true} style={style} labelStyle={{ fontSize: '30px'}} /> */}
          <ConfirmDialog
            loading={this.state.loading}
            facebookToken={this.state.facebookToken}
            selectedListings={this.props.selectedListings}
          />
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  selectedListings: state.selectedListings,
});

export default connect(mapStateToProps, null)(MyFacebookLogin);
