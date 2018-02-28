import { combineReducers } from 'redux';

const initialState = {listings:[], selectedListings:[]}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LISTINGS':
      return {
        ...state,
        listings: action.listings
      }

    case 'SEL_LISTING':
      return {
        ...state,
        selectedListings: [
          ...state.selectedListings,
          action.listing
        ]
      }

    default:
      return state;

  }
}

export default reducer;
