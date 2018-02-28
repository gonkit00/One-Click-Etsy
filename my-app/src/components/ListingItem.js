import React from 'react';

const ListingItem = (props) => (
  <div className="ListingItem">
    <img
      src={props.listing.MainImage.url_570xN}
      alt={props.listing.title.substr(0,20)}
    />
  </div>
)

export default ListingItem
