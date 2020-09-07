import React, { useEffect } from 'react'
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

  useEffect(() => {
    props.getListingsByCategory(categoryId, page, sortOption, filters)
  }, [props.sortOption, filters])

  if (!props.listings)
    return (
      <ReactLoading className="react-loading" type="bubbles" color="black" />
    )

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
