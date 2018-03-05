import React from 'react';
import TextField from 'material-ui/TextField';
import debounce from 'debounce';

const style = {
  fontSize: 30,
  height: 80
}

const SearchBox = (props) => {

  const callOnSearch = (e) => {
    props.onChangeSearchShop
    ? props.onChangeSearchShop(e)
    : props.onChangeSearchListings(e);
  }

  //debounce return a function, doesn't invoke it!
  const onChangeDebounced = debounce(callOnSearch, props.debounceTime);

  const onChange = (e) => {
    if(props.debounceTime) {
      //we persist the event, otherwise when debounce wait the event has gone!
      e.persist();
      onChangeDebounced(e);
    } else {
      callOnSearch(e);
    }
  }

  return (
    <div className="SearchBox">
      <TextField
        hintText=""
        floatingLabelText={props.onChangeSearchShop ? "My shop is " : "Search my listings "}
        onChange={onChange}
        style={style}
      />
    </div>
  )
}

export default SearchBox
