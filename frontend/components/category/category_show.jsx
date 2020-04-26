import React, { useEffect, useState } from 'react'

import ListingIndexItem from '../listing_index/listing_index_item'

const CategoryShow = (props) => {
  const {
    sortOption,
    page,
    match: {
      params: { categoryId }
    }
  } = props

  useEffect(() => {
    props.getListingsByCategory(categoryId, page, sortOption)
  }, [props.sortOption])

  if (!props.listings) return 'No items in this category.'
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
