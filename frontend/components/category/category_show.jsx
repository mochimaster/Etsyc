import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import ListingIndexItem from '../listing_index/listing_index_item'

const CategoryShow = (props) => {
  const { sortOption, page, filters, categoryId } = props

  const params = new URLSearchParams(props.location.search)
  const pageParams = params.get('page') || 1

  // const params = queryString.parse(props.location.search)
  // const pageParams = params.page

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    props
      .getListingsByCategory(categoryId, pageParams, sortOption, filters)
      .then(() => {
        setLoading(false)
      })
  }, [sortOption, filters, categoryId])

  if (loading) {
    return (
      <div id="react-loading" className="react-loading">
        <ReactLoading type="bubbles" color="black" />
      </div>
    )
  } else if (!props.listings) {
    return (
      <div>
        'No result in this category at current page. Please navigate to home
        screen.'
      </div>
    )
  }

  return (
    <div>
      <ul
        className={`index-wrapper ${
          isMobile ? 'device-mobile' : 'device-large'
        }`}
      >
        {props.listings.map((listing) => (
          <ListingIndexItem
            key={listing.id}
            listing={listing}
            deleteListing={props.deleteListing}
          />
        ))}
      </ul>
    </div>
  )
}

export default CategoryShow
