import React from 'react';
import { Link } from 'react-router-dom';

const CartIndexItem = (props) => {

  // debugger

  return (
    <li>
      {props.cart.quantity}
    </li>
  )
}

export default CartIndexItem;
