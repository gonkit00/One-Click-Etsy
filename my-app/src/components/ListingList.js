import React from "react";
import ListingItem from './ListingItem';

import RefreshIndicator from 'material-ui/RefreshIndicator';
const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: -9934
  },
};

const renderListings = (props) => {
  return props.loading
  ? <RefreshIndicator
      size={40}
      left={10}
      top={0}
      status="loading"
      style={style.refresh}
    />
  : props.listings.map(listing => (
        <ListingItem
          key={listing.listing_id}
          listing={listing}
          onSelectListing={props.onSelectListing}
        />
    )
  );
}

const ListingList = (props) => (
  <div className="ListingList">
    {renderListings(props)}
  </div>
)

export default ListingList;
