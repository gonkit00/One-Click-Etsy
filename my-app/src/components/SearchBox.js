import React from 'react';

export default (props) => (
  <div className="SearchBox">
    <label>
      {props.onChangeSearchShop ? 'Your Shop: ' : 'Search: '}
    </label>
    <input
      type="text"
      onChange={props.onChangeSearchShop ? props.onChangeSearchShop : props.onChangeSearchListings}
    />
  </div>
)
