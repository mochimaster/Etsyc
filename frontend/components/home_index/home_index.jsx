import React, { useEffect } from 'react'

import ListingIndex from '../listing_index/listing_index_container'

const HomeIndex = (props) => {
  useEffect(() => {
    props.getDisabledListingsByUserId(props.userId)
  }, [])

  return (
    <div>
      {/* <ListingIndex listings={props.disabledListings} match={props.match} /> */}
      <ListingIndex listings={props.listings} match={props.match} />
    </div>
  )
}

export default HomeIndex
