import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Search = (props) => {
  const [title, setTitle] = useState(
    props.location.search.slice(7).replace(/%20/g, ' ')
  )

  const updateTitle = ({ target: { value } }) => {
    setTitle(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.history.push(`/search?query=${title}`)
    props.search({ title })
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
