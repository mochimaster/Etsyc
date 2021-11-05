import React from 'react'
import { Link } from 'react-router-dom'

import { capitalize } from 'lodash'

const ListingIndexItem = ({ listing, deleteListing, isMobile }) => {
  // debugger
  const url = `/listings/${listing.id}`

  const deviceClassName = isMobile ? 'device-mobile' : 'device-large'
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

  const { id, title, author_id, merchant_name, price, brand } = listing

  let titleForUrl = title

  try {
    titleForUrl = title.replaceAll(' ', '-')
  } catch {
    console.log('replaceAll not supported for this browser.')
  }

  return (
    <li className="listing-item-wrapper">
      <div className={`listing-item-image ${deviceClassName}`}>
        <Link to={`/listings/${id}/${titleForUrl}`}>
          <tooltip title={title}>{displayImage}</tooltip>
        </Link>
      </div>
      <h4 className={`listing-item-title ${deviceClassName}`}>
        <tooltip title={capitalize(title)}>
          <Link
            className="listing-item-title-link"
            to={`/listings/${id}/${titleForUrl}`}
          >
            {capitalize(title)}
          </Link>
        </tooltip>
      </h4>
      {/* <div className="listing-item-brand">
        <Link
          className="listing-item-link"
          to={`/listings/${id}/${titleForUrl}`}
        >
          {brand || ''}
        </Link>
      </div> */}
      <div className={`listing-item-price ${deviceClassName}`}>$ {price}</div>
    </li>
  )
}

export default ListingIndexItem

// <div className="listing-item-description">
// Description: {listing.description} <br/>
// </div>
