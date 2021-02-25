import React from 'react'
import { Link } from 'react-router-dom'

const ListingIndexItem = ({ listing, deleteListing }) => {
  // debugger
  const url = `/listings/${listing.id}`
  //
  // const star = 4;
  // const starHTML = "";
  // const starLogic = (star) => {
  //   return {
  //     if (star>4.6){
  //       starHTML = "<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>";
  //     } else (star>=4.5){
  //       starHTML = "<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>";
  //     } else (star>4){
  //       starHTML = "<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>";
  //     } else  (star>3.5){
  //       starHTML = "<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>";
  //     } else (star>3){
  //       starHTML = "<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>";
  //     }
  //   }
  //
  // }

  let displayImage
  if (listing.photoUrls) {
    displayImage = (
      <img className="listing-thumbnail" src={listing.photoUrls[0]} />
    )
  } else if (listing.photoUrl) {
    displayImage = <img className="listing-thumbnail" src={listing.photoUrl} />
  }

  const { id, title, author_id, merchant_name, price } = listing

  return (
    <li className="listing-item-wrapper">
      <div className="listing-item-image">
        <Link to={`/listings/${id}/${title.replaceAll(' ', '-')}`}>
          <tooltip title={title}>{displayImage}</tooltip>
        </Link>
      </div>
      <div className="listing-item-title">
        <tooltip title={title}>
          <Link className="listing-item-title-link" to={`/listings/${id}`}>
            {title}
          </Link>
        </tooltip>
        <br />
      </div>
      <div className="listing-item-author">
        <Link className="listing-item-link" to={`/users/${author_id}/listings`}>
          {merchant_name}
        </Link>
      </div>
      <div className="listing-item-review"></div>
      <div className="listing-item-price">$ {price}</div>
    </li>
  )
}

export default ListingIndexItem

// <div className="listing-item-description">
// Description: {listing.description} <br/>
// </div>
