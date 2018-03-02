import React, { Component } from "react";
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import * as Actions from '../actions.js';
import config from '../config'
import queryString from 'query-string';

class MyFacebookLogin extends Component {

  //TODO: MyFacebookLogin: why the second json doesn't work?
  //TODO: MyFacebookLogin: when facebook login decide what is the privacy of my posts
  //TODO: MyFacebookLogin: empty the array after publishing
  //TODO: post for Facebook pages
  //TODO: recognize &#39; &quot; etc characters in description

  baseUrl = 'https://graph.facebook.com/v2.12';

  responseFacebook = (response) => {
    this.props.addFacebookToken(response.accessToken);
  }

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
          //TODO: notify the user
          .then(res => console.log('Facebook Post result: ',res.ok))
      })
    })
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
          <button onClick={this.publishPost}>BOOM!</button>
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
