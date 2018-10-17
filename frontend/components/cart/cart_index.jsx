import React from 'react';
import CartContainer from './cart_container';
import CartIndexItem from './cart_index_item';
import {asArray} from '../../reducers/selectors';
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

    // debugger
    return (
      <div>
        <ul>
          {this.props.carts.map(cart => {
            return (<CartIndexItem key={cart.id} cart={cart}
                deleteCart={this.props.deleteCart} updateCart={this.props.updateCart} />)
          })}

        </ul>
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
