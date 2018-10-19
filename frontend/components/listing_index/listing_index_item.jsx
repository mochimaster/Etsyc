import React from 'react';
import { Link } from 'react-router-dom';

const ListingIndexItem = ({listing, deleteListing}) => {
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

  // debugger
  return (
    <li className="listing-item-wrapper">
      <div className="listing-item-image">
        <Link to={`/listings/${listing.id}`}>
          <img src={listing.photoUrl} />
        </Link>



      </div>
      <div className="listing-item-title">
        <Link className="listing-item-title-link"
          to={`/listings/${listing.id}`}>{listing.title}</Link> <br/>
      </div>
      <div className="listing-item-author">
        <Link className="listing-item-link" to={`/users/${listing.author_id}/listings`} >{listing.merchant_name}</Link>
      </div>
      <div className="listing-item-review">
        
      </div>
      <div className="listing-item-price">
        $ {listing.price}
      </div>

    </li>
  )

}

export default ListingIndexItem;


// <div className="listing-item-description">
// Description: {listing.description} <br/>
// </div>
