import React from 'react';
import ListingItem from './ListingItem';

const renderListings = (props) => {
  return props.listings.map(listing =>
    <ListingItem
      key={listing.listing_id}
      listing={listing}
    />
  );
}

const ListingSelected = (props) => {
  // console.log(props.listings[0].listing_id);
  return (
    <div className="ListingSelected">
      {renderListings(props)}
    </div>

  )
};

export default ListingSelected
