import * as ApiUtil from '../util/cart_api_util';

export const RECEIVE_CART = 'RECEIVE_CART';
export const RECEIVE_CARTS = 'RECEIVE_CARTS';
export const REMOVE_CART = 'REMOVE_CART';

export const createCart = cart => {
  return dispatch => {
    return ApiUtil.createCart(cart).then( cart => {
      // debugger
      dispatch({type: RECEIVE_CART, cart});
    });
  };
};

// MIGHT NOT NEED
export const getCart = cart => {
  // debugger
  return dispatch => {
    return ApiUtil.getCart(cart).then( cart => {
      // debugger
      dispatch({type: RECEIVE_CART, cart});
    });
  };
};

export const getCarts = (user_id) => {
  // debugger
  return dispatch => {
    return ApiUtil.getCarts(user_id).then( carts => {
      debugger
      dispatch({type: RECEIVE_CARTS, carts });
    });
  };
};

export const deleteCart = (cart) => {
  return dispatch => {
    return ApiUtil.deleteCart(cart).then( () =>
    {
      dispatch({type: REMOVE_CART, cart: cart});
    } );
  };
};

export const updateCart = (cart) => {
  return dispatch => {
    return ApiUtil.updateCart(cart).then( (cart) => {
      dispatch({type: RECEIVE_CART, cart: cart});
    } );
  };
};
