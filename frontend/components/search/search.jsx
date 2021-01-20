import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { trackEvent, EVENTS } from '../../../utils/track'

const Search = (props) => {
  const [title, setTitle] = useState(
    props.location.search.slice(7).replace(/%20/g, ' ')
  )

  const [isHome, setHome] = useState(
    props.location.pathname.slice(-5) === '/home' || false
  )

  const updateTitle = ({ target: { value } }) => {
    setTitle(value)
  }

  useEffect(() => {
    setHome(props.location.pathname.slice(-5) === '/home')
  }, [props.location.pathname])

  const handleSubmit = (e) => {
    trackEvent({
      eventName: EVENTS.SEARCH_PRODUCT,
      eventProperties: { 'Search Term': title }
    })

    e.preventDefault()
    props.history.push(`/search?query=${title}`)
    props.search({ title, isDisabled: isHome })
  }

  return (
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
            placeholder="Search for items or shops"
            value={title}
            onChange={updateTitle}
          />
        </div>
        <div className="header-search-button-wrapper">
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  )
}

export default withRouter(Search)
