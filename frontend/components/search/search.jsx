import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { trackEvent, EVENTS } from '../../../utils/track'

const Search = (props) => {
  const userId = props.currentUser && props.currentUser.id

  const queryString = props.location.search
  const urlParams = new URLSearchParams(queryString)
  const searchTerm = urlParams.get('query') || ''

  const [title, setTitle] = useState(searchTerm)

  const [isHome, setHome] = useState(
    props.location.pathname.indexOf('/home') > 0 ? true : false
  )

  const [displaySearchContainer, setDisplaySearchContainer] = useState(false)

  window.onscroll = () => {
    const distanceScrolled = document.documentElement.scrollTop
    if (distanceScrolled) {
      window.removeEventListener('click', clickListener)
      setDisplaySearchContainer(false)
    }
  }

  const clickListener = (e) => {
    const coverElement = document.getElementById('search-text-input-mobile')

    if (coverElement) {
      if (coverElement.contains(e.target)) {
      } else {
        // enableWindowScroll()
        setDisplaySearchContainer(false)
        window.removeEventListener('click', clickListener)
      }
    }
  }

  useEffect(() => {
    displaySearchContainer
      ? window.addEventListener('click', clickListener)
      : window.removeEventListener('click', clickListener)
  }, [displaySearchContainer])

  const updateTitle = ({ target: { value } }) => {
    setTitle(value)
  }

  useEffect(() => {
    const atHomePath =
      props.location.pathname.indexOf('/home') > 0 ? true : false

    setHome(atHomePath)
  }, [props.location.pathname])

  const handleSubmit = (e) => {
    e.preventDefault()
    // enableWindowScroll()
    trackEvent({
      eventName: EVENTS.SEARCH_PRODUCT,
      eventProperties: { 'Search Term': title }
    })

    if (!isNaN(title)) {
      return props.history.push(`/listings/${title.replace(/^0+/, '')}`)
    }

    let finalPath = props.location.pathname.replace('/search', '')

    if (finalPath.indexOf('/listings') >= 0) {
      finalPath = `/${finalPath.split('/')[1]}`
    } else if (finalPath.indexOf('/categories') >= 0) {
      /**
       * Search within category currently not supported. Needs to be extended.
       * If search within categories, redirect to search within listings.
       */

      finalPath = '/listings'
    }

    let sortOption
    let filters

    if (
      finalPath.indexOf('/carts') >= 0 ||
      !(finalPath.indexOf('/users') >= 0 || finalPath.indexOf('/listings') >= 0)
    ) {
      finalPath = '/listings'
    }

    props.history.push({
      pathname: `${finalPath}/search`,
      search: `query=${title}`
    })

    if (isHome) {
      props.getDisabledListingsByUserId(
        userId,
        props.page,
        sortOption,
        filters,
        title
      )
    } else {
      props.searchListing({ title, isDisabled: isHome })
    }

    setTitle('')
  }

  return isMobile ? (
    <div className="header-search-div-container">
      <button
        className="search-button-mobile"
        onClick={() => setDisplaySearchContainer(true)}
      >
        <i
          className={`fas fa-search ${isMobile ? 'fa-search-mobile' : ''}`}
        ></i>
      </button>
      {displaySearchContainer && (
        <form onSubmit={handleSubmit}>
          <div className="mobile-search-container">
            <div className="input-search-div-mobile">
              <input
                id="search-text-input-mobile"
                className="mobile-search-text-input"
                placeholder="Search"
                value={title}
                onChange={updateTitle}
                autoComplete="off"
                autoFocus
              ></input>
              <button
                id="search-button-mobile"
                className="btn btn-primary search-button-mobile"
                onClick={handleSubmit}
              >
                <i
                  className={`fas fa-search ${
                    isMobile ? 'fa-search-mobile' : ''
                  }`}
                ></i>
              </button>
            </div>
            <div id="cover" className="cover"></div>
          </div>
        </form>
      )}
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      id="nav-search"
      className="header-search-nav-form"
      method=""
      action=""
    >
      <div className="header-search-bar-inner">
        <div className="header-search-bar-input-wrapper">
          <input
            id="search-query"
            type="text"
            placeholder="Search for items or item number"
            value={title}
            onChange={updateTitle}
          />
        </div>
        <div className="header-search-button-wrapper">
          <button className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default withRouter(Search)
