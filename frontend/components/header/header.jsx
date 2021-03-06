import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GreetingContainer from '../greeting/greeting_container'
import Search from '../search/search'

import { EVENTS, trackEvent } from '../../../utils/track'

const Header = (props) => {
  const navBar = props.currentUser ? (
    <li className="container-profile-picture">
      <a
        onClick={() => props.openModal('profileDropdown')}
        className="icon-avatar"
      >
        You
      </a>
    </li>
  ) : (
    <GreetingContainer />
  )

  const cartLink = (
    <Link
      to={props.currentUser ? `/users/${props.currentUser.id}/carts` : '/error'}
      className="icon-img-cart"
    >
      <i className="fas fa-shopping-cart"></i>
      <br />
      Cart
    </Link>
  )

  const sellLink =
    props.currentUser && props.currentUser.username === 'kee' ? (
      <li className="icon-sell-etsy">
        <Link
          onClick={() => {
            trackEvent({ eventName: EVENTS.SELL_ON_HERE })
          }}
          to={`/listings/new`}
          className="text-sell-etsy"
          href=""
        >
          Sell on here
        </Link>
      </li>
    ) : (
      <li></li>
    )

  return (
    <div id="global-header" className="header-nav-top-level">
      <header className="header-nav-inner">
        <Link
          to="/"
          id="craftsy-logo"
          className="header-site-logo"
          aria-label="Craftsy"
        ></Link>

        <div className="header-search-div-wrapper">
          <div className="header-search-bar-outer">
            <Search {...props} />
          </div>
        </div>

        <ul className="account-nav">
          {sellLink}
          {navBar}
          <li>
            <Link to="/faq" className="icon-img-discover icon-img-question">
              <i class="far fa-question-circle"></i>
              <br />
              FAQ
            </Link>
          </li>
          <li>{cartLink}</li>
        </ul>
      </header>
    </div>
  )
}

export default Header
