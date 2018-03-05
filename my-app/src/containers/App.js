import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import fetchJSONP from 'fetch-jsonp';
import { CSSTransitionGroup } from 'react-transition-group'
import debounce from 'debounce';

import * as Actions from '../actions.js';
import ListingList from '../components/ListingList';
import ListingSelected from '../components/ListingSelected';
import MyFacebookLogin from './MyFacebookLogin'
import SearchBox from '../components/SearchBox';
import config from '../config';

// import large_logo from '../images/logo_transparent_background.png';
import large_logo from '../images/white_logo_transparent_background.png';


class App extends Component {

  componentDidMount() {
    this.fetchListings();
  }

  state = {
    loading: false,
  }

  fetchListings = (value) => {
    if (!this.state.loading) this.setState({loading: true});
    const baseUrl = 'https://openapi.etsy.com/v2';
    // const shop = value;
    const shop = 'lollycloth';
    const limit = 30;
    const offset = 0;

    //TODO: debug debounce

    //After installing npm fetch-jsonp I can use JSONP recommended by Etsy to not have problems with cross requests
    fetchJSONP(`${baseUrl}/shops/${shop}/listings/active.js?includes=Images&&limit=${limit}&offset=${offset}&&api_key=${config.etsyApiKey}`)
      .then(res => res.json())
      .then(response => this.props.addListings(response.results))
      .then(() => this.setState({loading: false}))
  }

  handleSelectListing = (listing) => {
    this.props.toggleListingSelected(listing);
  }

  handleChangeSearchListings = (e) => {
    this.props.searchListings(e.target.value);
  }

  handleChangeSearchShop = (e) => {
    // debounce(() => {this.fetchListings(e.target.value)}, 1000);
    this.fetchListings(e.target.value)
  }

  render() {
    // console.log('Fetch in App: ', this.props.listings);

    return (
      <div className="App">
        <CSSTransitionGroup
          transitionName="fade-in-transition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
            <div className="header">
              <div className="image-logo">
                <img src={large_logo} alt="Handy Etsy"/>
              </div>
            </div>
        </CSSTransitionGroup>

        <div className="search-area">
          <CSSTransitionGroup
            transitionName="fade-in-transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
              <SearchBox
                // onChangeSearchShop={debounce(this.handleChangeSearchShop, 1000)}
                onChangeSearchShop={this.handleChangeSearchShop}
              />
              <SearchBox
                onChangeSearchListings={this.handleChangeSearchListings}
              />
          </CSSTransitionGroup>
        </div>

        <div className="block listings">
          <CSSTransitionGroup
            transitionName="fade-in-transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
              <div className="caption">
                <p>My listings</p>
                <small>All your listings are ordered by recency. Select the ones you want to share</small>
              </div>
              <ListingList
                loading={this.state.loading}
                listings={this.props.searchedListings}
                onSelectListing={this.handleSelectListing}
              />
          </CSSTransitionGroup>
        </div>

        <div className="block selected">
          <CSSTransitionGroup
            transitionName="fade-in-transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
              <div className="caption">
                <p>My selected listings</p>
                <small>All the listings you put here are ready to be shared in just one click</small>
              </div>
              <ListingSelected
                listings={this.props.selectedListings}
                onSelectListing={this.handleSelectListing}
              />
          </CSSTransitionGroup>
        </div>
        <MyFacebookLogin/>
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
