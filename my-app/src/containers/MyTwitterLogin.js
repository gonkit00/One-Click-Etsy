import React, { Component } from "react";
import { connect } from 'react-redux';
import * as Actions from '../actions.js';

class MyTwitterLogin extends Component {

  render () {
    return (
      <div className="MyTwitterLogin">

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTwitterToken: (token, secret) => dispatch(Actions.addTwitterToken(token, secret))
});

const mapStateToProps = (state) => ({
  twitterToken: state.twitterToken
});

export default connect(mapStateToProps, null)(MyTwitterLogin);
