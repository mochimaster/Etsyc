import React from 'react';
import { Link } from 'react-router-dom';

const ListingIndexItem = ({listing, deleteListing}) => {
  // debugger
  const url = `/listings/${listing.id}`
  return (
    <li>
      <Link to={`/listings/${listing.id}`}><img alt="test_image" src="https://i.etsystatic.com/17442787/r/il/6f8689/1640702720/il_570xN.1640702720_56of.jpg" /></Link>
      <Link to={`/listings/${listing.id}`}>Title: {listing.title}</Link> <br/>
      Description: {listing.description} <br/>
      Created by: {listing.author_id} <br/>
      <br/>

    </li>
  )

}

export default ListingIndexItem;
