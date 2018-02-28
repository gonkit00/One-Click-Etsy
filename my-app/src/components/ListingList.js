import React from "react";
import ListingItem from './ListingItem';

const renderListings = (props) => {
  return props.listings.map(listing => (
    //Take care: the key always in the first element!!
      <a
        key={listing.listing_id}
        href="#"
        onClick={() => {props.onSelectListing(listing)}}
      >
        <ListingItem
          listing={listing}
          onSelectListing={props.onSelectListing}
        />
      </a>
    )
  );
}

const ListingList = (props) => (
  <div className="ListingList">
    {renderListings(props)}
  </div>
)

export default ListingList;
