import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import ListingIndexItem from '../listing_index/listing_index_item'

const CategoryShow = (props) => {
  const {
    sortOption,
    page,
    match: {
      params: { categoryId }
    },
    filters
  } = props

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    props
      .getListingsByCategory(categoryId, page, sortOption, filters)
      .then(() => {
        setLoading(false)
      })
  }, [props.sortOption, filters])

  if (loading) {
    return (
      <div id='react-loading' className="react-loading">
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
      <ul className="index-wrapper">
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
