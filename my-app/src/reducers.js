import { combineReducers } from 'redux';

const initialState = {
  listings:[],
  selectedListings:[],
  searchedListings:[],
  searchedShop:[],
  facebookToken:undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LISTINGS':
      return {
        ...state,
        listings: action.listings,
        searchedListings: action.listings
      }

    case 'TOGGLE_LISTING_SELECTED':
      return {
        ...state,
        selectedListings: state.selectedListings.includes(action.listing)
          ? state.selectedListings.filter(listing => listing.listing_id !== action.listing.listing_id)
          : [...state.selectedListings, action.listing]
      }

    case 'SEARCH_LISTINGS':
      return {
        ...state,
        searchedListings: state.listings.filter(listing => listing.title.toLowerCase().includes(action.searchText))
      }

    case 'SEARCH_SHOP':
      return {
        ...state,
        searchedShop: action.searchText
      }

    case 'ADD_FACEBOOK_TOKEN':
      return {
        ...state,
        facebookToken: action.token
      }

    default:
      return state;
  }
}

export default reducer;
