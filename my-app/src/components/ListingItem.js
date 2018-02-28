import React from 'react';

const ListingItem = (props) => (
  <div className="ListingItem">
    <a href="">
      <img
        src={props.listing.MainImage.url_170x135}
        alt={props.listing.title.substr(0,80)}
      />
      <small className="description">
        {props.listing.title.substr(0,80)}...
      </small>
    </a>
  </div>
)

export default ListingItem
