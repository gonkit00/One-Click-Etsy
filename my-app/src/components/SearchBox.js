import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
  fontSize: 30,
  height: 80
}

export default (props) => (
  <div className="SearchBox">
    <TextField
      hintText=""
      floatingLabelText={props.onChangeSearchShop ? "My shop is " : "Search my listings "}
      onChange={props.onChangeSearchShop ? props.onChangeSearchShop : props.onChangeSearchListings}
      style={style}
    />
  </div>
)
