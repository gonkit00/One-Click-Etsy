import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';
import ListingList from '../components/ListingList';
import ListingSelected from '../components/ListingSelected';
import ListingSearch from '../components/ListingSearch';
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

    fetch(`${baseUrl}/shops/${shop}/listings/active?includes=MainImage&&limit=${limit}&offset=${offset}&&api_key=${apiKey}`)
      .then(res => res.json())
      .then(response => this.props.addListings(response.results))
  }

  handleSelectListing = (listing) => {
    this.props.toggleListingSelected(listing);
  }

  handleChangeSearchBox = (e) => {
    this.props.searchListings(e.target.value);
  }

  render() {
    // console.log('Fetch in App: ', this.props.listings);
    return (
      <div className="App">
        <ListingSearch
          onChangeSearchBox={this.handleChangeSearchBox}
        />
        <ListingList
          listings={this.props.searchedListings}
          onSelectListing={this.handleSelectListing}
        />
        <ListingSelected
          listings={this.props.selectedListings}
          onSelectListing={this.handleSelectListing}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // listings: state.listings,
  selectedListings: state.selectedListings,
  searchedListings: state.searchedListings,
});

const mapDispatchToProps = (dispatch) => ({
  addListings: (listings) => dispatch(Actions.addListings(listings)),
  toggleListingSelected: (listing) => dispatch(Actions.toggleListingSelected(listing)),
  searchListings: (searchText) => dispatch(Actions.searchListings(searchText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
