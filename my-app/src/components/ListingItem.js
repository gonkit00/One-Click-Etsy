import React from 'react';

const ListingItem = (props) => (
  <div className="ListingItem">
    {props.listing.title.substr(0,15)}...
  </div>
)

export default ListingItem
