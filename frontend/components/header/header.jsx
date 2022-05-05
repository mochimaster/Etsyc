import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GreetingContainer from '../greeting/greeting_container'
import Search from '../search/search'

import { EVENTS, trackEvent } from '../../../utils/track'

// ;<i class="fa-solid fa-user"></i>
const Header = (props) => {
  const isAdmin = props.currentUser && props.currentUser.username === 'kee'
  const navBar = props.currentUser ? (
    <li
      className={`container-profile-picture ${
        isMobile ? 'container-profile-picture-mobile' : ''
      }`}
    >
      {/* <a
        onClick={() => props.openModal('profileDropdown')}
        className={`icon-avatar ${isMobile ? 'icon-avatar-mobile' : ''}`}
      >
        <p className="icon-avatar-text-mobile">You</p>
      </a> */}
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault()
          props.openModal('profileDropdown')
        }}
        className={`icon-img-profile ${
          isMobile ? 'icon-img-profile-mobile' : ''
        }`}
      >
        <i
          className={`fa-solid fa-user ${
            isMobile ? 'fa-solid fa-user-mobile' : ''
          }`}
        ></i>
        <br />
        {isMobile ? '' : 'You'}
      </Link>
    </li>
  ) : (
    <GreetingContainer />
  )

  const cartLink = (
    <Link
      to={
        props.currentUser
          ? `/users/${props.currentUser.id}/carts`
          : '/users/temp/carts'
      }
      className="icon-img-cart"
    >
      <i
        className={`fas fa-shopping-cart ${
          isMobile ? 'fa-shopping-cart-mobile' : ''
        }`}
      ></i>
      <br />
      {isMobile ? '' : 'Cart'}
    </Link>
  )

  const sellLink = isAdmin ? (
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

  const manageListingsLink = (
    <li>
      {isAdmin && (
        <Link
          className="header-button manage-listing"
          to={`/users/${props.currentUser.id}/home`}
        >
          Manage listings
        </Link>
      )}
    </li>
  )

  return (
    <div
      id="global-header"
      className={
        window.isMobile ? 'header-nav-top-level-mobile' : 'header-nav-top-level'
      }
    >
      <header
        className={`header-nav-inner ${
          isMobile ? 'header-nav-inner-mobile' : ''
        }`}
      >
        <div
          className={`header-site-logo-container ${
            isMobile ? 'header-site-logo-container-mobile' : ''
          }`}
        >
          <Link
            to="/"
            id={`${isMobile ? 'craftsy-logo-mobile' : 'craftsy-logo'}`}
            className="header-site-logo"
            aria-label="Craftsy"
          ></Link>
        </div>

        {!isMobile && (
          <div className="header-search-div-wrapper">
            <div className="header-search-bar-outer">
              <Search {...props} />
            </div>
          </div>
        )}

        <ul className={`account-nav ${isMobile ? 'account-nav-mobile' : ''}`}>
          {isAdmin && sellLink}
          {isMobile && navBar}
          {isMobile && (
            <li>
              <div className="header-search-div-wrapper">
                <div className="header-search-bar-outer">
                  <Search {...props} />
                </div>
              </div>
            </li>
          )}
          {!isMobile && sellLink}
          {!isMobile && manageListingsLink}
          {!isMobile && navBar}
          <li>
            <Link
              to="/faq"
              className={`icon-img-discover icon-img-question ${
                isMobile ? 'icon-img-question-mobile' : ''
              }`}
            >
              <i
                class={`far fa-question-circle ${
                  isMobile ? 'fa-question-circle-mobile' : ''
                }`}
              ></i>
              <br />
              {isMobile ? '' : 'FAQ'}
            </Link>
          </li>
          <li>{cartLink}</li>
        </ul>
      </header>
    </div>
  )
}

export default Header
