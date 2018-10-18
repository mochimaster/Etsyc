import React from 'react';
import CartContainer from './cart_container';
import CartIndexItem from './cart_index_item';
import {asArray} from '../../reducers/selectors';
import { Link } from 'react-router-dom';

// import ListingIndexContainer from '../listing_form/listing_index_container';


class CartIndex extends React.Component {

  constructor(props){
    // debugger
    super(props)
    this.state = {
      listings: props.listings ? props.listings : "",
      carts: props.carts ? props.carts : ""
    }
  }

  componentDidMount(){
    // debugger
    this.props.getCarts(this.props.currentUserId).then(() => {
      console.log('calling setstate')
      // debugger
      this.setState({
        carts: this.props.carts,
        listings: this.props.listings
      })
    })

    // this.props.getListings()
  }

  // if (Object.keys(this.props.carts).length < 1){
  //   return null
  // }
  // || Object.keys(this.props.entities.listings).length < 1

  render() {
    // debugger

    if(!this.props.carts ){
      return null
    }

    let sum=0;
    for(let i=0; i< Object.keys(this.props.carts).length; i++ ){
      sum += (this.props.carts[i].price * this.props.carts[i].quantity)
    }

    let itemCount=0;
    itemCount=Object.keys(this.props.carts).length;

    let itemCountDisplay;
    if (itemCount < 1) {
      itemCountDisplay=<p></p>
    } else if (itemCount === 1){
      itemCountDisplay = <p>1 item in your cart</p>
    } else {
      itemCountDisplay = <p> {itemCount} items in your cart</p>
    }

    return (
      <div className="cart-index-page-container">

        <div className="sub-header-container">
          <div className="cart-item-count">
          {itemCountDisplay}
          <Link className="keep-shopping-link btn btn-primary" to="/listings">Keep Shopping</Link>
          </div>
        </div>
        <div className="cart-index-section-wrapper">
          <ul className="cart-index-wrapper">
            {this.props.carts.map(cart => {
              return (<CartIndexItem key={cart.id} cart={cart}
                  deleteCart={this.props.deleteCart} updateCart={this.props.updateCart} />)
            })}

          </ul>

          <div className="cart-index-right-side">
            <div className="cart-index-checkout">
              <div className="total-amount">Item(s) total: ${sum}</div>

              <button className="checkout-button btn btn-primary"> Proceed to checkout (TBD)</button>
            </div>



          </div>
        </div>

      </div>
    )
  }
}

// listing={this.props.listings[cart.listing_id]}

// return  cart.title
// return <li> {cart.quantity} </li>

// { this.props.carts.map(cart => {
//   return (<CartIndexItem key={cart.id} cart={cart} listing={this.props.listing[cart.id]}/>)
//
// }) }

export default CartIndex;
