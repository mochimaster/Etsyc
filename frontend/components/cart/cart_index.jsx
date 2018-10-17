import React from 'react';
import CartContainer from './cart_container';
import CartIndexItem from './cart_index_item';
import {asArray} from '../../reducers/selectors';

class CartIndex extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    debugger
    this.props.getCarts(this.props.currentUserId)
  }

  componentWillUnmount(){
    debugger
  }
  // if (Object.keys(this.props.carts).length < 1){
  //   return null
  // }

  render() {
    debugger

    if(!this.props.carts){
      return null
    }

    return (
      <div>
        <ul>
          { this.props.carts.map(cart => {
            return (<CartIndexItem key={cart.id} cart={cart} />)

          }) }
        </ul>
      </div>
    )
  }
}
// return <li> {cart.quantity} </li>

export default CartIndex;
