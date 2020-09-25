import React from 'react'
import ReactLoading from 'react-loading'

import ListingShowContainer from './listing_show_container'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import ReviewIndexContainer from '../review/review_index_container'
import ReviewForm from '../review/review_create_form_container'
import Slider from '../slider/slider_container'
import { renewListing } from '../../util/listing_api_util'

class ListingShow extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    this.state = {
      quantity: 1,
      isLoading: true
    }

    this.toggleListingStatus = this.toggleListingStatus.bind(this)
  }

  updateQuantity(e) {
    // debugger
    this.setState({ quantity: parseInt(e.target.value) })
  }

  componentDidMount() {
    // debugger
    // this.props.getListings();
    this.props.getListing(this.props.match.params.listingId).then(() => {
      this.setState({ isLoading: false })
    })
  }

  // componentWillReceiveProps(nextProps){
  //   debugger
  //   if (this.props.listing.id != nextProps.match.params.listingId) {
  //     debugger
  //     this.props.getListing(nextProps.match.params.listingId);
  //   }
  // }

  // The render() function should be pure, meaning that it does not modify
  // component state, it returns the same result each time it’s invoked, and
  // it does not directly interact with the browser.
  //
  // If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead. Keeping render() pure makes components easier to think about.
  //
  //

  phoneNumberExist() {
    if (this.props.listing.phoneNumber) {
      return (
        <div className="listing-seller-phone-number">
          ☎️ :{' '}
          <a href={'tel: '.concat(this.props.listing.phoneNumber)}>
            {this.props.listing.phoneNumber}
          </a>
        </div>
      )
    }
  }

  confirmDelete() {
    const confirmed = confirm('Are you sure you want to delete this listing?')
    if (confirmed) {
      this.props
        .deleteListing(this.props.listing.id)
        .then(this.props.history.push('/listings'))
    }
  }

  getListingDisplayStatus(listingStatus) {
    if (listingStatus === false) {
      return 'Available'
    }

    return 'Not Available'
  }

  toggleListingStatus(listingStatus) {
    const newStatus = listingStatus ? false : true

    this.props.updateListing({ id: this.props.listing.id, status: newStatus })
  }

  handleRenewListing(listing) {
    this.props.renewListing(listing.id).then(alert('Listing renewed.'))
  }

  render() {
    if (this.state.isLoading || !this.props.listing) {
      return (
        <div id="react-loading" className="react-loading">
          <ReactLoading tye="bubbles" color="black" />
        </div>
      )
    }

    const { status: listingStatus, author_id: authorId } = this.props.listing
    const isListingAuthor = authorId === this.props.sessionId

    if (!listingStatus && !isListingAuthor) {
      return (
        <div className="error-message">
          This listing is no longer available.
        </div>
      )
    }

    let displayAuthorButton
    if (isListingAuthor) {
      displayAuthorButton = (
        <div className="listing-show-author-buttons">
          <Link
            className="btn btn-primary listing-show-edit-button"
            to={`/listings/${this.props.listing.id}/edit`}
          >
            Edit Listing
          </Link>
          <button
            className="btn btn-primary listing-renew-listing-button"
            onClick={() => this.handleRenewListing(this.props.listing)}
          >
            Renew Listing
          </button>
          <input
            className="btn btn-primary listing-toggle-listing-status-button"
            type="submit"
            value={`Mark as ${this.getListingDisplayStatus(listingStatus)}`}
            onClick={() => this.toggleListingStatus(listingStatus)}
          />
          <input
            className="btn btn-primary listing-show-delete-button"
            type="submit"
            value="Delete Listing"
            onClick={this.confirmDelete.bind(this)}
          />
        </div>
      )

      // editButton = <Link className="btn btn-primary listing-show-edit-button"
      //   to={`/listings/${this.props.listing.id}/edit`} >Edit Listing</Link>

      // deleteButton = <input className="btn btn-primary listing-show-delete-button"
      //   type="submit" value="Delete Listing"
      //   onClick={() => this.props.deleteListing(this.props.listing.id)
      //                     .then(()=>this.props.history.push("/listings"))
      //   } />
    }

    let reviewForm
    if (this.props.sessionId) {
      reviewForm = <ReviewForm listingId={this.props.listing.id} />
    } else {
      reviewForm = (
        <div className="review-input">Please sign in to leave a review.</div>
      )
    }

    // let quantityDropdown="";
    // for(let i=0; i<100; i++){
    //   quantityDropdown += "<option value="+ i + ">+i+</option>"
    // }
    //
    // quantityDropdown = quantityDropdown.slice(7,-8);
    //
    // let quantityDropdown2 = new Element(() => {
    //   return (
    //
    //
    //
    //   )
    // })

    // let reviewComponent;
    // if(this.props.sessionId){
    //   <p>You must be signed in to leave a review.</p>
    // } else {
    //   reviewComponent = <ReviewForm listingId={this.props.listing.id}/>

    // }

    let images = []
    if (this.props.listing.photoUrls) {
      for (let i = 0; i < this.props.listing.photoUrls.length; i++) {
        images.push(this.props.listing.photoUrls[i])
      }
    }

    if (this.props.listing.photoUrl) {
      images.push(this.props.listing.photoUrl)
    }

    let itemNumber = this.props.match.url.slice(10)
    while (itemNumber.length <= 4) {
      itemNumber = '0' + itemNumber
    }

    return (
      <div className="listing-show-content-wrapper">
        {displayAuthorButton}
        <div className="listing-show-seller-header">
          <div className="listing-header-seller-left">
            {/* <div className="listing-header-seller-rating"> */}
            {/*Rating in stars (xx)*/}
            {/* </div> */}
          </div>
          <div className="listing-header-seller-thumbnails">
            {/*Other items in thumbnails...*/}
          </div>
        </div>

        <div className="listing-show-body-wrapper">
          <div className="listing-image listing-left-half">
            {/* <img src={this.props.listing.photoUrl} /> */}
            <Slider images={images} />
            {/* {displayImages} */}
          </div>

          <div className="listing-details listing-right-half">
            <div className="listing-header-seller-name">
              <Link
                className="listing-seller-name"
                to={`/users/${this.props.listing.author_id}/listings`}
              >
                {this.props.listing.merchantName}
              </Link>
              <div className="listing-seller-phone">
                {this.phoneNumberExist()}
              </div>
            </div>
            <div className="listing-details listing-details-title">
              {this.props.listing.title} {`  (${itemNumber})`}
            </div>
            <div className="listing-details listing-details-price">
              ${this.props.listing.price}
            </div>
            {/*
            <div className="listing-details listing-details-shipping">
              Shipping fee
            </div>
            */}
            <div className="listing-details listing-details-quantity">
              Quantity <br />
              <input
                className="input-quantity input-quantity-input"
                onChange={this.updateQuantity.bind(this)}
                className="select-custom"
                placeholder="1"
              />
            </div>

            <div className="listing-details add-to-cart">
              <button
                onClick={() =>
                  this.props
                    .createCart({
                      quantity: this.state.quantity,
                      listing_id: this.props.listing.id,
                      user_id: this.props.sessionId
                    })
                    .then(() =>
                      this.props.history.push(
                        `/users/${this.props.sessionId}/carts`
                      )
                    )
                }
              >
                Add to cart
              </button>
            </div>

            <div className="listing-details listing-details-condition">
              <label className="condition-label">Condition: </label>
              {this.props.listing.condition}
            </div>
            <br></br>

            <div className="listing-details listing-details-overview">
              <label className="title-label">Overview</label>
              <p className="overview">{this.props.listing.overview}</p>
            </div>
          </div>

          <div className="listing-description">
            <label className="title-label">Description</label> <br />
            <p>{this.props.listing.description}</p>
          </div>

          <div />
          <div>
            <ReviewForm listingId={this.props.listing.id} />
          </div>
          <div />

          <div className="listing-reviews">
            <ReviewIndexContainer
              createReview={this.props.createReview}
              listing={this.props.listing}
              sessionId={this.props.sessionId}
              listingId={this.props.listing.listingId}
            />
          </div>
        </div>
      </div>
    )
  }
}
// {<option dangerouslySetInnerHTML={{ __html: quantityDropdown}} />}

// <img alt="test_image" src="https://i.etsystatic.com/17442787/r/il/6f8689/1640702720/il_570xN.1640702720_56of.jpg" />

export default ListingShow
