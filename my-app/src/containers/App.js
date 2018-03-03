import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';
import ListingList from '../components/ListingList';
import ListingSelected from '../components/ListingSelected';
import SearchBox from '../components/SearchBox';
import config from '../config';
import fetchJSONP from 'fetch-jsonp';
// import large_logo from '../images/logo_transparent_background.png';
import large_logo from '../images/white_logo_transparent_background.png';

import MyFacebookLogin from '../containers/MyFacebookLogin'

class App extends Component {

  componentDidMount() {
    this.fetchListings();
  }

  fetchListings = (value) => {
    const baseUrl = 'https://openapi.etsy.com/v2';
    const shop = value;
    // const shop = 'lollycloth';
    const limit = 30;
    const offset = 0;

    //TODO: handle the limit/pagination
    //TODO: add fetch loader

    //After installing npm fetch-jsonp I can use JSONP recommended by Etsy to not have problems with cross requests
    fetchJSONP(`${baseUrl}/shops/${shop}/listings/active.js?includes=Images&&limit=${limit}&offset=${offset}&&api_key=${config.etsyApiKey}`)
      .then(res => res.json())
      .then(response => this.props.addListings(response.results))
  }

  handleSelectListing = (listing) => {
    this.props.toggleListingSelected(listing);
  }

  handleChangeSearchListings = (e) => {
    this.props.searchListings(e.target.value);
  }

  handleChangeSearchShop = (e) => {
    this.fetchListings(e.target.value);
  }

  render() {
    // console.log('Fetch in App: ', this.props.listings);

    return (
      <div className="App">
        <div className="header">
          <div className="image-logo">
            <img src={large_logo} alt="Handy Etsy"/>

          </div>
        </div>

        <div className="search-area">
          <SearchBox
            onChangeSearchShop={this.handleChangeSearchShop}
          />
          <SearchBox
            onChangeSearchListings={this.handleChangeSearchListings}
          />
        </div>
        <div className="block listings">
          <div className="caption">
            <p>My listings</p>
            <small>All the listings from the shop you searched for are ordered by recency</small>
          </div>
          <ListingList
            listings={this.props.searchedListings}
            onSelectListing={this.handleSelectListing}
          />
        </div>
        <div className="block selected">
          <div className="caption">
            <p>My selected listings</p>
            <small>All the listings you put here are ready to be posted on Facebook</small>
          </div>
          <ListingSelected
            listings={this.props.selectedListings}
            onSelectListing={this.handleSelectListing}
          />
        </div>
        <MyFacebookLogin
          selectedListings={this.props.selectedListings}
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
