import React from "react";
import ListingItem from './ListingItem';

const renderListings = (props) => {
  return props.listings.map(listing =>
    <ListingItem
      key={listing.listing_id}
      listing={listing}
      onSelectListing={props.onSelectListing}
    />
  );
}

const ListingList = (props) => (
  <div className="ListingList">
    {renderListings(props)}
  </div>
)

export default ListingList;
