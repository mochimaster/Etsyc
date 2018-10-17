import React from 'react';
import { Link } from 'react-router-dom';


// const CartIndexItem = ({cart, listing}) => {
class CartIndexItem extends React.Component {
  constructor(props){
    super(props)

  }
  // debugger

  render() {
    return (
      <li>
        <div className="cart-index-item-title">
          Title: {this.props.cart.title}
        </div>
        <div className="cart-index-item-photo">
          Photo: ---
        </div>
        <div className="cart-index-item-quantity">
          Quantity: {this.props.cart.quantity}
        </div>
        <div className="cart-index-item-price">
          Price: {this.props.cart.price}
        </div>
        <div className="cart-index-item-remove">
          <button onClick={()=>this.props.deleteCart(this.props.cart)}>Remove</button>
        </div>
      </li>
    )
  }
}

// {listing.id}
export default CartIndexItem;
