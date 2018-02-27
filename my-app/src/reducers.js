import { combineReducers } from 'redux';

const initialState = {listings:[]}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LISTINGS':
      return {
        ...state,
        listings: action.listings
      }

    default:
      return state;

  }
}

export default reducer;
