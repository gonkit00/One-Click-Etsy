import React, { Component } from "react";
import { connect } from 'react-redux';

class MyTwitterLogin extends Component {

  render () {
    return (
      <div classname="MyTwitterLogin">

      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  selectedListings: state.selectedListings,
});

export default connect(mapStateToProps, null)(MyTwitterLogin);
