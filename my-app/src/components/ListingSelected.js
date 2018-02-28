import React from 'react';
import ListingList from './ListingList';

const ListingSelected = (props) => {
  // console.log(props.listings[0].listing_id);
  return (
    <div className="ListingSelected">
      <ListingList
        listings={props.listings}
      />
    </div>

  )
};

export default ListingSelected
