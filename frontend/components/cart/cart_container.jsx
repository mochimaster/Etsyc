import { connect } from 'react-redux'

import CartIndex from './cart_index'

import { updateCart, deleteCart, getCarts } from '../../actions/cart_actions'
import {
  getListing,
  getTempCartListing,
  removeTempCartListing,
  updateTempCartListings,
  getTempCartListings
} from '../../actions/listing_actions'
import { asArray } from '../../reducers/selectors'

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id || undefined,
    carts: asArray(state.entities.carts) || [],
    listings: asArray(state.entities.listings),
    tempCarts: asArray(state.entities.tempCarts) || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCarts: (user_id) => dispatch(getCarts(user_id)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    deleteCart: (cart) => dispatch(deleteCart(cart)),
    getListing: (id) => dispatch(getListing(id)),
    getTempCartListing: (id, quantity) =>
      dispatch(getTempCartListing(id, quantity)),
    removeTempCartListing: (id) => dispatch(removeTempCartListing(id)),
    updateTempCartListings: (cart) => dispatch(updateTempCartListings(cart)),
    getTempCartListingsByIds: (ids, quantity) => {
      dispatch(getTempCartListings(ids, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIndex)
