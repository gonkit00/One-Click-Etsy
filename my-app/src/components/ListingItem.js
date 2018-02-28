import React from 'react';

const ListingItem = (props) => {
  return (
    <div className="ListingItem">
        <img
          src={props.listing.MainImage.url_170x135}
          alt={props.listing.title.substr(0,80)}
        />
        <div>
          <small className="description">
            {props.listing.title.substr(0,80)}...
          </small>
        </div>
    </div>
  )
}

export default ListingItem
