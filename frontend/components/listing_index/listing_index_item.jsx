import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { capitalize } from 'lodash'
import { useInView } from 'react-intersection-observer'

const ListingIndexItem = ({ listing }) => {
  const { ref, inView } = useInView({
    threshold: 0
  })

  const [displayActualImage, setDisplayActualImage] = useState(false)

  useEffect(() => {
    if (inView) setDisplayActualImage(true)
  }, [inView])

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

  const getImage = () => {
    let orderedThumbnail
    if (listing.photosOrder && listing.photosOrder.length) {
      orderedThumbnail = listing.photosOrder[0]
    }

    const nonOrderedThumbnail = listing.photoUrls
      ? listing.photoUrls[0]
      : listing.photoUrl

    return displayActualImage ? (
      <img
        className="listing-thumbnail"
        src={orderedThumbnail ? orderedThumbnail : nonOrderedThumbnail}
      />
    ) : (
      <img className="listing-thumbnail" src="./image_loading.png" />
    )
  }

  const { id, title, author_id, merchant_name, price, brand } = listing

  let titleForUrl = title

  try {
    titleForUrl = title.replaceAll(' ', '-')
  } catch {
    console.log('replaceAll not supported for this browser.')
  }

  return (
    <li className={`listing-item-wrapper ${deviceClassName}`}>
      <div className={`listing-item-image ${deviceClassName}`}>
        <Link to={`/listings/${id}/${titleForUrl}`}>
          <tooltip title={title}>
            <div ref={ref}>{getImage()}</div>
          </tooltip>
        </Link>
      </div>
      <h4 className={`listing-item-title ${deviceClassName}`}>
        <tooltip title={title}>
          <Link
            className="listing-item-title-link"
            to={`/listings/${id}/${titleForUrl}`}
          >
            {title.replace(/\w+/g, capitalize)}
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
