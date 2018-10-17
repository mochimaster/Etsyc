import {connect} from 'react-redux';
import {updateCart, deleteCart,getCarts } from '../../actions/cart_actions';
import CartIndex from './cart_index';
import {asArray} from '../../reducers/selectors';
// import {getListings} from '../../actions/listing_actions';

// carts: Array(7)
//   0:
//     cart_item:
//       2: {id: 2, quantity: 4, listing_id: 9, user_id: 2, price: 23}
//       __proto__: Object
//     listings:
//       9: {id: 9, title: "My fancy listing 6"}

const mapStateToProps = state => {
  // debugger
  return {
    currentUserId: state.session.id,
    carts: asArray(state.entities.carts),
    listings: asArray(state.entities.listings)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCarts: (user_id) => dispatch(getCarts(user_id)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    deleteCart: (cart) => dispatch(deleteCart(cart)),
    getListing: (id) => dispatch(getListing(id)),
    getListings: (listingIds) => dispatch(getListings(listingIds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIndex);
