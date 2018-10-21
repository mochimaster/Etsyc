import React from 'react';
import { Link } from 'react-router-dom';


// const CartIndexItem = ({cart, listing}) => {
class CartIndexItem extends React.Component {
  constructor(props){
    super(props)
    // debugger
    this.state = {
      id: props.cart.id,
      user_id: props.cart.user_id,
      quantity: props.cart.quantity
    }

  }
  // debugger


  updateQuantity(e){
    // debugger
    this.setState({quantity: parseInt(e.target.value)},
      ()=> this.props.updateCart(this.state))


      // .then(()=> console.log('setting state'))
  }

  render() {
    // debugger
    // let preselectedQuantity = this.props.cart.quantity
    // let quantitySelect = document.getElementById('quantitySelect');

    // for(let i=0, j=0; i = quantitySelect.options[j]; j++) {
    //   debugger
    //   if(parseInt(i.value) === preselectedQuantity){
    //     quantitySelect.selectedIndex = j;
    //   }
    // }

    // debugger

    // <img src={this.props.listing.photoUrl} />



    return (
      <li className="cart-index-item">
        <div className="cart-index-merchant-name">
          <Link className="cart-index-merchant-name-link" to={`/users/${this.props.cart.author_id}/listings`}>{this.props.cart.merchant_name}</Link>
        </div>

        <div className="cart-left-section-middle-section-wrapper">
          <div className="cart-index-item-photo">
            <img src={this.props.cart.photoUrl} />
          </div>
          <div className="cart-index-item-title">
            <Link className="cart-index-item-title-link" to={`/listings/${this.props.cart.listing_id}`}>{this.props.cart.title}</Link>
          </div>

          <div className="cart-index-item-quantity">
            <div className="cart-index-item-quantity-collapse">
              <p>Quantity:</p>
              <input id="quantityText" value={this.props.cart.quantity} onChange={this.updateQuantity.bind(this)} className="select-custom" />
            </div>

            <div className="cart-index-item-remove">
              <a className="remove-link" onClick={()=>this.props.deleteCart(this.props.cart)}>Remove</a>
            </div>
          </div>
          <div className="cart-index-item-price">
            $ {this.props.cart.price}
          </div>
        </div>



      </li>
    )
  }
}

// {listing.id}
export default CartIndexItem;
