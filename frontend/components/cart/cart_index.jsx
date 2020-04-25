import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import CartIndexItem from './cart_index_item'

const CartIndex = (props) => {
  useEffect(() => {
    props.getCarts(props.currentUserId)
  }, [])

  if (!props.carts) {
    return <div className="cart-empty">Your cart is empty.</div>
  }

  const itemCount = props.carts.length

  const itemCountDisplay =
    itemCount === 1 ? (
      <p>1 item in your cart</p>
    ) : (
      <p> {itemCount} items in your cart</p>
    )

  let sum = 0
  props.carts.forEach(
    ({ price = 1, quantity = 0 }) => (sum += price * quantity)
  )

  return (
    <div className="cart-index-page-container">
      <div className="sub-header-container">
        <div className="cart-item-count">
          {itemCountDisplay}
          <Link className="keep-shopping-link btn btn-primary" to="/listings">
            Keep Shopping
          </Link>
        </div>
      </div>
      <div className="cart-index-section-wrapper">
        <ul className="cart-index-wrapper">
          {props.carts.map((cart) => {
            return (
              <CartIndexItem
                key={cart.id}
                cart={cart}
                deleteCart={props.deleteCart}
                updateCart={props.updateCart}
              />
            )
          })}
        </ul>

        <div className="cart-index-right-side">
          <div className="cart-index-checkout">
            <div className="total-amount">Item(s) total: ${sum}</div>

            <button className="checkout-button btn btn-primary">
              <div class="tool-tip-text">
                Online checkout is not currently available. Please call to
                arrange for in-person pick up or delivery.
              </div>
              Proceed to checkout (TBD)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartIndex
