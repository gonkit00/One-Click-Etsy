export const addListings = (listings) => ({
  type: 'ADD_LISTINGS',
  listings
});

export const searchListings = (searchText) => ({
  type: 'SEARCH_LISTINGS',
  searchText
});

export const toggleListingSelected = (listing) => ({
  type: 'TOGGLE_LISTING_SELECTED',
  listing
});

export const addFacebookToken = (token) => ({
  type: 'ADD_FACEBOOK_TOKEN',
  token
});
