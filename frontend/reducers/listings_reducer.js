import {RECEIVE_LISTING, RECEIVE_LISTINGS, REMOVE_LISTING} from '../actions/listing_actions';
import merge from 'lodash/merge';

const listingsReducer = (oldState={}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_LISTINGS:
      // return action.listings;
      const listings = {};
      action.listings.forEach(listing => {
        listings[listing.id] = listing;
      });

      return listings;

    case RECEIVE_LISTING:
      let newState = merge({}, oldState);
      // debugger
      return merge(newState, {[action.listing.id]: action.listing});

    case REMOVE_LISTING:
      let newState2 = merge({}, oldState);
      delete newState2[action.listingId];
      return newState2;

    default:
      return oldState;

  }

};

export default listingsReducer;