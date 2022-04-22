import React from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <li className="cart-index-item">
      <div className="cart-index-merchant-name">
        <Link
          className="cart-index-merchant-name-link"
          to={`/users/${props.cart.author_id}/listings`}
        >
          {props.cart.merchant_name || ''}
        </Link>
      </div>

      <div className="cart-left-section-middle-section-wrapper">
        <div className="cart-index-item-photo">
          <img src={props.cart.photoUrl || props.cart.photoUrls[0]} />
        </div>
        <div className="cart-index-item-title">
          <Link
            className="cart-index-item-title-link"
            to={`/listings/${props.cart.listing_id}/${props.cart.title}`}
          >
            {props.cart.brand}
            <br />
            {props.cart.title} ({getItemNumber(`${props.cart.listing_id}`)})
          </Link>
        </div>

        <div className="cart-index-item-quantity">
          <div className="cart-index-item-quantity-collapse">
            <p>Quantity:</p>
            <input
              id="quantityText"
              value={props.cart.quantity}
              onChange={updateQuantity}
              className="select-custom"
            />
          </div>

          <div className="cart-index-item-remove">
            <a
              className="remove-link"
              onClick={() => props.deleteCart(props.cart)}
            >
              Remove
            </a>
          </div>
        </div>
        <div className="cart-index-item-price">$ {props.cart.price}</div>
      </div>
    </li>
  )
}

export default CartIndexItem
