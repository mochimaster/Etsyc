import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { pick, round } from 'lodash'

import CartIndexItem from './cart_index_item'
import { Collapsible } from '../collapsible/collapsible'
import { addMobileClassName } from '../../../utils/helper'

const CartIndex = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(props.currentUserId)
  const [transformedTempCarts, setTransformedTempCarts] = useState([])
  const [listingsIdandQuantity, setListingsIdandQuantity] = useState([])

  useEffect(() => {
    if (props.session) setIsSignedIn(true)
  }, [props.session])

  useEffect(() => {
    props.getCarts(props.currentUserId)
  }, [])

  useEffect(() => {
    const localStorageCartItems = window.localStorage.getItem('cartItems')

    const cartItemsJSON =
      (localStorageCartItems && JSON.parse(localStorageCartItems)) || {}

    const tempListingsIdandQuantity = []
    for (const cartItem in cartItemsJSON) {
      tempListingsIdandQuantity.push({
        id: cartItem,
        quantity: cartItemsJSON[cartItem].quantity
      })
    }

    setListingsIdandQuantity(tempListingsIdandQuantity)

    props.getTempCartListingsByIds(
      tempListingsIdandQuantity.map(({ id }) => id)
    )
  }, [])

  const transformTempCarts = (tempCarts, listingsIdandQuantity) => {
    return tempCarts.map((tempCart) => {
      let quantity

      if (tempCart.quantity && tempCart.quantity > 0) {
        quantity = tempCart.quantity
      } else {
        const matchingId = listingsIdandQuantity.filter(
          (listingIdAndQuantity) => listingIdAndQuantity.id == tempCart.id
        )[0]

        quantity = (matchingId && matchingId.quantity) || 1
      }

      return {
        ...tempCart,
        listing_id: tempCart.id,
        quantity
      }
    })
  }

  useEffect(() => {
    if (!isSignedIn) {
      const transformed = transformTempCarts(
        props.tempCarts,
        listingsIdandQuantity
      )

      setTransformedTempCarts(transformed)
    }
  }, [props.tempCarts])

  if (!props.carts && transformedTempCarts.length < 1) {
    return <div className="cart-empty">Your cart is empty.</div>
  }

  const itemCount = isSignedIn
    ? props.carts.length
    : transformedTempCarts.length

  const itemCountDisplay =
    itemCount === 1 ? (
      <p>1 item in your cart</p>
    ) : (
      <p> {itemCount} items in your cart</p>
    )

  let cartSum = 0
  props.carts.forEach(
    ({ price = 1, quantity = 0 }) => (cartSum += price * quantity)
  )

  const tempCartsSum = transformedTempCarts.reduce(
    (sum, { price, quantity = 1 }) => (sum += price * quantity),
    0
  )

  const deleteTempCart = (listingId) => {
    const updatedTempCarts = transformedTempCarts.filter(
      ({ id }) => listingId !== id
    )

    const objectTempCarts = {}

    updatedTempCarts.forEach((tempCart) => {
      objectTempCarts[tempCart.id] = tempCart
    })

    window.localStorage.setItem('cartItems', JSON.stringify(objectTempCarts))
    setTransformedTempCarts(updatedTempCarts)

    props.removeTempCartListing(listingId)
  }

  const updateTempCart = (tempCart) => {
    const updatedTempCarts = transformedTempCarts.map((transformedTempCart) =>
      tempCart.id === transformedTempCart.id
        ? { ...transformedTempCart, quantity: parseInt(tempCart.quantity) }
        : transformedTempCart
    )

    const objectTempCarts = {}
    updatedTempCarts.forEach((tempCart) => {
      objectTempCarts[tempCart.id] = { quantity: parseInt(tempCart.quantity) }
    })

    window.localStorage.setItem('cartItems', JSON.stringify(objectTempCarts))
    setTransformedTempCarts(updatedTempCarts)

    props.updateTempCartListings(updatedTempCarts)
  }

  const displayUserCart = props.carts.map((cart) => {
    return (
      <CartIndexItem
        key={cart.id}
        cart={cart}
        deleteCart={props.deleteCart}
        updateCart={props.updateCart}
      />
    )
  })

  const displayTempCart = transformedTempCarts.map((cart) => {
    return (
      <CartIndexItem
        key={cart.id}
        cart={cart}
        deleteCart={(cart) => deleteTempCart(cart.id)}
        updateCart={(cart) => updateTempCart(cart)}
      />
    )
  })

  const displayCartItemCountAndKeepShopping = (
    <div className="cart-item-count">
      <div> </div>
      {itemCountDisplay}
      <Link
        className={`${addMobileClassName(
          'keep-shopping-link'
        )} btn btn-primary`}
        to="/listings"
      >
        Keep Shopping
      </Link>
      <div> </div>
    </div>
  )

  const displayUserOrTempCart = isSignedIn ? displayUserCart : displayTempCart

  const displayDeliveryOption = (
    <div className="">
      Delivery available through Lugg.{' '}
      <a
        target="_blank"
        href="https://lugg.com/estimate?origin=Z2lkOi8vbHVnZy9Mb2NhdGlvbi9kYjUxM2I5ZS03NmNmLTQxN2UtODllYy00NDBhZGI0YWEyODI"
      >
        Calculate delivery
      </a>{' '}
      to your address.
    </div>
  )

  const displayPaymentType = (
    <div className="payment-container">
      <p>Accepted payments: Cash, Zelle, or Cashapp</p>
      <p>Include item number when submitting payment.</p>
      <br />
      <p>Scan or Tap QR Code for Zelle payment</p>
      <p>
        Zelle:{' '}
        <a
          href="https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiQ0FTVExFIEFORCBDSEFJUiBJTkMiLCJhY3Rpb24iOiJwYXltZW50IiwidG9rZW4iOiJjYXN0bGVhbmRjaGFpckBnbWFpbC5jb20ifQ=="
          target="_blank"
        >
          castleandchair@gmail.com
        </a>
      </p>
      <p>Enrolled as Castle and Chair Inc.</p>
      <br />
      {displayDeliveryOption}
      <br />
      <a
        href="https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiQ0FTVExFIEFORCBDSEFJUiBJTkMiLCJhY3Rpb24iOiJwYXltZW50IiwidG9rZW4iOiJjYXN0bGVhbmRjaGFpckBnbWFpbC5jb20ifQ=="
        target="_blank"
      >
        <img
          id={'payment-zelle'}
          className={addMobileClassName('payment-zelle')}
          aria-label="Payment - Zelle"
        ></img>
      </a>
      <br />
      <br />
      <br />
      <p>Scan or Tap QR Code for Cash App payment</p>
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

      {!isMobile && displayDeliveryOption}
    </div>
  )

  const displayTotalAmount = (
    <>
      <div className="total">
        Item(s) sub-total: ${isSignedIn ? cartSum : tempCartsSum}
      </div>
      <div className="total">
        Tax(10.75%): $
        {round((isSignedIn ? cartSum : tempCartsSum) * 0.1075, 2).toFixed(2)}
      </div>
      <div className="total-amount">
        Total: $
        {round((isSignedIn ? cartSum : tempCartsSum) * 1.1075, 2).toFixed(2)}
      </div>
    </>
  )

  const displayDesktopView = (
    <div className="cart-index-page-container">
      <div className="sub-header-container">
        {displayCartItemCountAndKeepShopping}
      </div>
      <div className="cart-index-section-wrapper">
        <ul className="cart-index-wrapper">{displayUserOrTempCart}</ul>

        <div className="cart-index-right-side">
          <div className="cart-index-checkout">
            {displayTotalAmount}

            {displayPaymentType}
          </div>
        </div>
      </div>
    </div>
  )

  const displayMobileView = (
    <div className="cart-index-page-container">
      <div className="sub-header-container">
        {displayCartItemCountAndKeepShopping}
      </div>
      <div className={addMobileClassName('cart-index-cart-summary')}>
        <Collapsible
          title="Order Summary"
          content={
            <ul className={addMobileClassName('cart-index-wrapper')}>
              {displayUserOrTempCart}
            </ul>
          }
        />

        <div className={addMobileClassName('cart-index-checkout')}>
          {displayTotalAmount}

          {displayPaymentType}
          {/* {displayDeliveryOption} */}
        </div>
      </div>
    </div>
  )

  return isMobile ? displayMobileView : displayDesktopView
}

export default CartIndex
