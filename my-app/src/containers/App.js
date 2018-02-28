import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from '../actions.js'
import ListingList from '../components/ListingList'

class App extends Component {

  componentDidMount() {
    this.fetchListings();
  }

  fetchListings = () => {
    const baseUrl = 'https://openapi.etsy.com/v2';
    const shop = 'lollycloth';
    const apiKey = 'qby4xtftjcqygc06vwpk5oom';
    const limit = 30;
    const offset = 0;

    //TODO: manage the limit/pagination
    //TODO: manage cors

    fetch(`${baseUrl}/shops/${shop}/listings/active?includes=MainImage&&limit=${limit}&offset=${offset}&&api_key=${apiKey}`)
      .then(res => res.json())
      .then(response => this.props.addListings(response.results))
  }

  render() {
    console.log('Fetch in App: ', this.props.listings);
    return (
      <div className="App">
        <ListingList listings={this.props.listings}/>
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
