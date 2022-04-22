import { merge } from 'lodash'
import { RECEIVE_CARTS_LISTINGS } from '../actions/cart_table_actions'

const cartsListingsReducer = (oldState = [], action) => {
  switch (action.type) {
    case RECEIVE_CARTS_LISTINGS:
      return [...oldState, ...action.cartsListings]

    default:
      return oldState
  }
}

export default cartsListingsReducer
