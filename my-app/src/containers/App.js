import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';
import ListingList from '../components/ListingList';
import ListingSelected from '../components/ListingSelected';
import apiKey from '../apiKey';

class App extends Component {

  componentDidMount() {
    this.fetchListings();
  }

  fetchListings = () => {
    const baseUrl = 'https://openapi.etsy.com/v2';
    const shop = 'lollycloth';
    const limit = 30;
    const offset = 0;

    //TODO: manage the limit/pagination
    //TODO: manage cors
    //TODO: add fetch loader
    //TODO: add searchBar

    fetch(`${baseUrl}/shops/${shop}/listings/active?includes=MainImage&&limit=${limit}&offset=${offset}&&api_key=${apiKey}`)
      .then(res => res.json())
      .then(response => this.props.addListings(response.results))
  }

  handleSelectListing = (listing) => {
    if (!this.props.selectedListings.includes(listing)) {
      this.props.selectListing(listing);
    }
  }

  render() {
    // console.log('Fetch in App: ', this.props.listings);
    return (
      <div className="App">
        <ListingList
          listings={this.props.listings}
          onSelectListing={this.handleSelectListing}
        />
        <ListingSelected
          listings={this.props.selectedListings}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.listings,
  selectedListings: state.selectedListings,
});

const mapDispatchToProps = (dispatch) => ({
  addListings: (listings) => dispatch(Actions.addListings(listings)),
  selectListing: (listing) => dispatch(Actions.selectListing(listing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
