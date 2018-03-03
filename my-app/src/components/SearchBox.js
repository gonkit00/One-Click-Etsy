import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
  fontSize: 20
}

export default (props) => (
  <div className="SearchBox">
    <TextField
      hintText=""
      floatingLabelText={props.onChangeSearchShop ? "My shop is " : "My listings are "}
      onChange={props.onChangeSearchShop ? props.onChangeSearchShop : props.onChangeSearchListings}
      style={style}
    />
  </div>
)
