import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';
import ListingList from '../components/ListingList';
import ListingSelected from '../components/ListingSelected';
import SearchBox from '../components/SearchBox';
import config from '../config';
import fetchJSONP from 'fetch-jsonp';

import MyFacebookLogin from '../containers/MyFacebookLogin'

class App extends Component {

  componentDidMount() {
    this.fetchListings();
  }

  fetchListings = () => {
    const baseUrl = 'https://openapi.etsy.com/v2';
    // const shop = this.props.searchedShop;
    const shop = 'lollycloth';
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

  handleChangeSearchShop = async (e) => {
    await this.props.searchShop(e.target.value);
    this.fetchListings();
  }

  render() {
    // console.log('Fetch in App: ', this.props.listings);
    return (
      <div className="App">
        {/* <button href="http://localhost:3001/sign-in-pinterest">Sign in with pinterest</button> */}

        <SearchBox
          onChangeSearchShop={this.handleChangeSearchShop}
        />
        <SearchBox
          onChangeSearchListings={this.handleChangeSearchListings}
        />
        <ListingList
          listings={this.props.searchedListings}
          onSelectListing={this.handleSelectListing}
        />
        <ListingSelected
          listings={this.props.selectedListings}
          onSelectListing={this.handleSelectListing}
        />
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
  searchedShop: state.searchedShop,
});

const mapDispatchToProps = (dispatch) => ({
  addListings: (listings) => dispatch(Actions.addListings(listings)),
  toggleListingSelected: (listing) => dispatch(Actions.toggleListingSelected(listing)),
  searchListings: (searchText) => dispatch(Actions.searchListings(searchText)),
  searchShop: (searchText) => dispatch(Actions.searchShop(searchText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
