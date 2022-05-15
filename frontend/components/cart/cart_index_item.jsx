import React from 'react'
import { Link } from 'react-router-dom'
import { addMobileClassName } from '../../../utils/helper'

const getItemNumber = (listingId) => {
  while (listingId.length <= 4) {
    listingId = '0' + listingId
  }

  return listingId
}

const CartIndexItem = (props) => {
  const updateQuantity = (e) => {
    props.updateCart({
      id: props.cart.id,
      user_id: props.cart.user_id,
      quantity: e.target.value
    })
  }

  const getCartThumbnailImage = () => {
    if (props.cart.photosOrder && props.cart.photosOrder.length)
      return props.cart.photosOrder[0]

    return (
      props.cart.photoUrl || (props.cart.photoUrls && props.cart.photoUrls[0])
    )
  }

  const displayMerchantName = (
    <div className="cart-index-merchant-name">
      <Link
        className="cart-index-merchant-name-link"
        to={`/users/${props.cart.author_id}/listings`}
      >
        {props.cart.merchant_name || ''}
      </Link>
    </div>
  )

  const displayThumbnail = (
    <div className="cart-index-item-photo">
      <img src={getCartThumbnailImage()} />
    </div>
  )

  const displayTitle = (
    <div className={addMobileClassName('cart-index-item-title')}>
      <Link
        className="cart-index-item-title-link"
        to={`/listings/${props.cart.listing_id}/${props.cart.title}`}
      >
        {props.cart.brand === 'null' ? '' : props.cart.brand}
        <br />
        {props.cart.title} ({getItemNumber(`${props.cart.listing_id}`)})
      </Link>
    </div>
  )

  const displayQuantity = (
    <div className="cart-index-item-quantity-collapse">
      <div>Quantity: </div>
      <input
        id={`${isMobile ? 'quantityText-mobile' : 'quantityText'}`}
        value={props.cart.quantity}
        onChange={updateQuantity}
        className="select-custom"
      />
    </div>
  )

  const displayQuantityMobile = (
    <div className="quantity-buttons-container-mobile">
      <button
        className="btn-secondary quantity-button-mobile quantity-button-cart-mobile quantity-button-left-mobile"
        onClick={(e) =>
          props.updateCart({
            id: props.cart.id,
            user_id: props.cart.user_id,
            quantity: props.cart.quantity - 1
          })
        }
      >
        -
      </button>
      <p className="quantity-value-mobile quantity-value-cart-mobile">
        {props.cart.quantity}
      </p>
      <button
        className="btn-secondary quantity-button-mobile quantity-button-cart-mobile quantity-button-right-mobile"
        onClick={(e) =>
          props.updateCart({
            id: props.cart.id,
            user_id: props.cart.user_id,
            quantity: props.cart.quantity + 1
          })
        }
      >
        +
      </button>
    </div>
  )

  const displayRemoveFromCart = (
    <div className="cart-index-item-remove">
      <a className="remove-link" onClick={() => props.deleteCart(props.cart)}>
        Remove
      </a>
    </div>
  )

  const displayListingPrice = (
    <div className={addMobileClassName('cart-index-item-price')}>
      $ {props.cart.price}
    </div>
  )

  const displayDesktopView = (
    <li className="cart-index-item">
      {displayMerchantName}

      <div className="cart-left-section-middle-section-wrapper">
        {displayThumbnail}
        {displayTitle}

        <div className="cart-index-item-quantity">
          {displayQuantity}

          {displayRemoveFromCart}
        </div>
        {displayListingPrice}
      </div>
    </li>
  )

  const displayMobileView = (
    <li className="cart-index-item">
      {displayMerchantName}

      <div
        className={addMobileClassName(
          'cart-left-section-middle-section-wrapper'
        )}
      >
        {displayThumbnail}
        {displayTitle}

        <div className="cart-index-item-quantity">
          {/* {displayQuantity} */}
          {displayQuantityMobile}

          {displayRemoveFromCart}
        </div>
      </div>
      {displayListingPrice}
    </li>
  )

  return isMobile ? displayMobileView : displayDesktopView
}

export default CartIndexItem
