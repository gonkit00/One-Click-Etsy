import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from './actions.js'

class App extends Component {

  componentDidMount() {
    this.fetchListings();
  }

  fetchListings = () => {
    const baseUrl = 'https://openapi.etsy.com/v2';
    const shop = 'lollycloth';
    const apiKey = 'qby4xtftjcqygc06vwpk5oom';
    //TODO: manage the limit
    fetch(`${baseUrl}/shops/${shop}/listings/active?api_key=${apiKey}`)
      .then(res => res.json())
      .then(response => this.props.addListings(response.results))
  }

  render() {
    console.log(this.props.listings);
    return (
      <div className="App">
        App.js!!
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.listings,
});

const mapDispatchToProps = (dispatch) => ({
  addListings: (listings) => dispatch(Actions.addListings(listings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
