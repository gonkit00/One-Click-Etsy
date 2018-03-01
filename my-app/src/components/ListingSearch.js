import React from 'react';

export default (props) => (
  <div className="ListingSearch">
    <label>Search</label>
    <input
      type="text"
      onChange={props.onChangeSearchBox}
    />
  </div>
)
