import merge from 'lodash/merge';
import {RECEIVE_CART, RECEIVE_CARTS, REMOVE_CART} from '../actions/cart_actions';

const cartsReducer = (oldState={}, action) => {
  switch (action.type) {
    case RECEIVE_CART:
      // debugger
      let newState = merge({}, oldState);
      return merge(newState, {[action.cart.id]: action.cart});

    case RECEIVE_CARTS:
      // let carts = {};
      // action.carts.forEach(cart => {
      //   carts[cart.id] = cart;
      // });
      // return carts;
      if(Object.keys(action.carts).length<1){
        return oldState;
      }


      return action.carts.cart_item;

    case REMOVE_CART:

      let newState2 = merge({}, oldState);
      delete newState2[action.cart.id];
      return newState2;

    default:
      return oldState;

  }
};

export default cartsReducer;
