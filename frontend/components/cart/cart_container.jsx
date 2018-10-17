import {connect} from 'react-redux';
import {updateCart, deleteCart,getCarts } from '../../actions/cart_actions';
import CartIndex from './cart_index';
import {asArray} from '../../reducers/selectors';


const mapStateToProps = state => {
  return {
    currentUserId: state.session.id,
    carts: asArray(state.entities.carts)

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCarts: (user_id) => dispatch(getCarts(user_id)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    deleteCart: (cart) => dispatch(deleteCart(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIndex);
