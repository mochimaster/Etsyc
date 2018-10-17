import React from 'react';
import { Link } from 'react-router-dom';

const CartIndexItem = ({cart, listing}) => {

  // debugger

  return (
    <li>
      <div className="cart-index-item-title">
        Title: {cart.title}
      </div>
      <div className="cart-index-item-quantity">
        Quantity: {cart.quantity}
      </div>
      <div className="cart-index-item-price">
        Price: {cart.price}
      </div>
    </li>
  )
}

// {listing.id}
export default CartIndexItem;
