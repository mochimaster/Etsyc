import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { round } from 'lodash'

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
            <div className="total">Item(s) sub-total: ${sum}</div>
            <div className="total">
              Tax(10.75%): ${round(sum * 0.1075, 2).toFixed(2)}
            </div>
            <div className="total-amount">
              Total: ${round(sum * 1.1075, 2).toFixed(2)}
            </div>

            <div className="payment-container">
              <p>Accepted payments: Cash, Zelle, or Cashapp</p>
              <p>Include item number when submitting payment.</p>
              <br />
              <h1>Zelle: castleandchair@gmail.com</h1>
              <p>Enrolled as Castle and Chair Inc.</p>
              <br />
              <p>Scan or Tap QR Code for payment</p>
              <p>
                Cashapp:{' '}
                <a href="https://cash.app/$castleandchair" target="_blank">
                  $castleandchair
                </a>
              </p>
              <a href="https://cash.app/$castleandchair" target="_blank">
                <img
                  id="payment-cashapp"
                  className="payment-cashapp"
                  aria-label="Payment - Cashapp"
                ></img>
              </a>
              <a href="https://cash.app/app/KVFFDRK" target="_blank">
                Get $5 using my code: KVFFDRK
              </a>
              <br />
              <br />
              {/* <p>Scan or Tap QR Code for payment</p>
              Venmo ID:{' '}
              <a
                href="https://venmo.com/code?user_id=1631646868570112774"
                target="_blank"
              >
                @castleandchair
              </a> */}

              <div className="">
                Delivery available through Lugg.{' '}
                <a
                  target="_blank"
                  href="https://lugg.com/estimate?destination_id=db513b9e-76cf-417e-89ec-440adb4aa282&origin_id=db513b9e-76cf-417e-89ec-440adb4aa282&use_case=store_delivery"
                >
                  Calculate delivery
                </a>{' '}
                to different zip code.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartIndex
