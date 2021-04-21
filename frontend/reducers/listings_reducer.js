import {
  RECEIVE_LISTING,
  RECEIVE_LISTINGS,
  REMOVE_LISTING
} from '../actions/listing_actions'
import { RECEIVE_CARTS, RECEIVE_CART } from '../actions/cart_actions'
import { RECEIVE_CATEGORIES } from '../actions/category_actions'
import merge from 'lodash/merge'

const listingsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  switch (action.type) {
    case RECEIVE_LISTINGS:
      const listings = []
      const listingIds = []

      action.listings.listings.forEach((listing) => {
        if (listingIds.indexOf(listing.id) === -1) {
          listingIds.push(listing.id)
          listings.push({ [listing.id]: listing })
        }
      })

      return listings

    case RECEIVE_LISTING:
      return { [action.listing.id]: action.listing }

    case REMOVE_LISTING:
      let newState2 = merge({}, oldState)
      delete newState2[action.listingId]
      return newState2

    case RECEIVE_CARTS:
      if (Object.keys(action.carts).length < 1) {
        return oldState
      }
      // debugger
      let newState3 = merge({}, oldState)
      return action.carts.listings

    // case RECEIVE_CART:
    //   debugger
    //   let newState4 = merge({}, oldState);
    //   delete newState4[action.carts.listings];
    //   return newState4;

    default:
      return oldState
  }
}

export default listingsReducer
