import { merge, omit } from 'lodash'

import {
  RECEIVE_TEMP_CART_LISTING,
  REMOVE_TEMP_CART_LISTING,
  RECEIVE_TEMP_CART_LISTINGS
} from '../actions/listing_actions'

const tempCartsReducer = (oldState = {}, action) => {
  let newState
  switch (action.type) {
    case RECEIVE_TEMP_CART_LISTING:
      if (!action.listing.status) return oldState

      newState = merge({}, oldState)

      return merge(newState, { [action.listing.id]: action.listing })

    case REMOVE_TEMP_CART_LISTING:
      newState = oldState.filter((tempCart) => tempCart.id !== action.id)

      return newState

    case RECEIVE_TEMP_CART_LISTINGS:
      return action.cart

    default:
      return oldState
  }
}

export default tempCartsReducer
