import { connect } from 'react-redux'

import CartIndex from './cart_index'

import { updateCart, deleteCart, getCarts } from '../../actions/cart_actions'
import { asArray } from '../../reducers/selectors'

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id,
    carts: asArray(state.entities.carts),
    listings: asArray(state.entities.listings)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCarts: (user_id) => dispatch(getCarts(user_id)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    deleteCart: (cart) => dispatch(deleteCart(cart)),
    getListing: (id) => dispatch(getListing(id)),
    getListings: (listingIds) => dispatch(getListings(listingIds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIndex)
