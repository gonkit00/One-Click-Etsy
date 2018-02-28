export const addListings = (listings) => ({
  type: 'ADD_LISTINGS',
  listings
});

export const selectListing = (listing) => ({
  type: 'SEL_LISTING',
  listing
});

export const deselectListing = (listing) => ({
  type: 'DESEL_LISTING',
  listing
});
