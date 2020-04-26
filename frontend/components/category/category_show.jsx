import React, { useEffect, useState } from 'react'

import ListingIndexItem from '../listing_index/listing_index_item'

const CategoryShow = (props) => {
  const [listings] = useState(props.listings)

  const {
    sortOption,
    page,
    location: { pathname }
  } = props
  const category = pathname.split('/categories/')[1]

  useEffect(() => {
    props.getListingsByCategory(category, page, sortOption)
  }, [listings, props.sortOption])

  if (!props.listings) return 'No items in this category.'
  return (
    <div>
      <ul className="index-wrapper">
        {props.listings.map((listing) => {
          return (
            <ListingIndexItem
              key={listing.id}
              listing={listing}
              deleteListing={props.deleteListing}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryShow
