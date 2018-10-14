import React from 'react';

const ListingIndexItem = ({listing, deleteListing}) => {
  // debugger
  return (
    <li>
      <a href={`/api/listings/${listing.id}`}><img alt="test_image" src="https://i.etsystatic.com/17442787/r/il/6f8689/1640702720/il_570xN.1640702720_56of.jpg" /></a>
      Title: {listing.title} <br/>
      Description: {listing.description} <br/>
      Created by: {listing.author_id} <br/>
      <br/>

    </li>
  )

}

export default ListingIndexItem;
