import React from 'react'
import ReactLoading from 'react-loading'

import ListingShowContainer from './listing_show_container'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import ReviewIndexContainer from '../review/review_index_container'
import ReviewForm from '../review/review_create_form_container'
import Slider from '../slider/slider_container'
import { renewListing } from '../../util/listing_api_util'

import { trackEvent, EVENTS } from '../../../utils/track'

class ListingShow extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    this.state = {
      quantity: 1,
      isLoading: true,
      isTracked: false,
      displayAddToCartToolTip: false
    }

    this.updateListing = this.updateListing.bind(this)
  }

  updateQuantity(e) {
    this.setState({ quantity: parseInt(e.target.value) })
  }

  componentDidMount() {
    this.props.getListing(this.props.match.params.listingId).then(() => {
      this.setState({ isLoading: false })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listing && !prevState.isLoading && !this.state.isTracked) {
      trackEvent({
        eventName: EVENTS.VIEW_LISTING,
        eventProperties: { title: prevProps.listing.title }
      })

      this.setState({ isTracked: true })
    }

    if (
      this.props.match.params.listingId !== prevProps.match.params.listingId
    ) {
      this.setState({ isLoading: true })

      this.props.getListing(this.props.match.params.listingId).then(() => {
        this.setState({ isLoading: false })
      })
    }

    const { listingTitle } = this.props.match.params
    if (!listingTitle && this.props.listing) {
      this.props.history.push(
        `${this.props.location.pathname}/${this.props.listing.title}`
      )
    }
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
          <div>
            ☎️ :{' '}
            <a href={'tel: '.concat(this.props.listing.phoneNumber)}>
              {this.props.listing.phoneNumber}
            </a>
            {'  '}|{'  '}💬:{' '}
            <a
              href={`sms:+15109361639&body=Hi, I would like to inquire about item number ${this.props.listing.id} - ${this.props.listing.title}`}
            >
              Click here to text!
            </a>
          </div>
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

  updateListing(payload) {
    this.props.updateListing({ id: this.props.listing.id, ...payload })
  }

  handleRenewListing(listing) {
    this.props.renewListing(listing.id).then(alert('Listing renewed.'))
  }

  handleDuplicateListing(listing) {
    this.props.duplicateListing(listing)
    this.props.history.push(`/listings/new`)
  }

  render() {
    if (this.state.isLoading) {
      setTimeout(() => {
        this.setState({ isLoading: false })
      }, 7000)

      return (
        <div id="react-loading" className="react-loading">
          <ReactLoading tye="bubbles" color="black" />
        </div>
      )
    }

    if (!this.props.listing && !this.state.loading) {
      return (
        <div className="error-message">
          Listing not found, please return to home page.
        </div>
      )
    }

    const {
      status: listingStatus,
      author_id: authorId,
      title
    } = this.props.listing
    const isListingAuthor = authorId === this.props.sessionId

    if (!listingStatus && !isListingAuthor) {
      return (
        <div className="error-message">
          This listing is no longer available.
        </div>
      )
    }

    const isListingPending = title.includes('PENDING') ? true : false

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
            className="btn btn-primary listing-toggle-pending"
            type="submit"
            value={isListingPending ? 'Mark Non-pending' : 'Mark Pending'}
            onClick={() => {
              this.updateListing({
                title: isListingPending
                  ? `${this.props.listing.title.replaceAll('(PENDING) ', '')}`
                  : `(PENDING) ${this.props.listing.title}`
              })
            }}
          />
          <input
            className="btn btn-primary listing-toggle-listing-status-button"
            type="submit"
            value={`Mark ${this.getListingDisplayStatus(listingStatus)}`}
            onClick={() =>
              this.updateListing({ status: listingStatus ? false : true })
            }
          />
          <input
            className="btn btn-primary listing-duplicate-button"
            type="submit"
            value={`Duplicate this listing`}
            onClick={() => this.handleDuplicateListing(this.props.listing)}
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

    let itemNumber = this.props.match.params.listingId
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

            <tooltip
              className="add-to-cart-button-tooltip"
              onMouseEnter={() =>
                this.setState({ displayAddToCartToolTip: true })
              }
              onMouseLeave={() =>
                this.setState({ displayAddToCartToolTip: false })
              }
            >
              {!this.props.sessionId && this.state.displayAddToCartToolTip ? (
                <div className="add-to-cart-tooltip">
                  You must sign in to use cart.
                </div>
              ) : (
                <div className="add-to-cart-tooltip"></div>
              )}
              <div className="listing-details add-to-cart">
                <button
                  className={this.props.sessionId ? '' : 'button-disabled'}
                  onClick={() => {
                    trackEvent({
                      eventName: EVENTS.ADD_TO_CART,
                      eventProperties: { title: this.props.listing.description }
                    })
                    return this.props
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
                  }}
                >
                  Add to cart
                </button>
                <div className="delivery-estimate">
                  Delivery available through Lugg.{' '}
                  <a
                    target="_blank"
                    href="https://lugg.com/estimate?destination_id=db513b9e-76cf-417e-89ec-440adb4aa282&origin_id=db513b9e-76cf-417e-89ec-440adb4aa282&use_case=store_delivery"
                  >
                    Calculate delivery
                  </a>{' '}
                  to different zip code.
                </div>
              </div>
            </tooltip>
            <div>Item number: {itemNumber}</div>
            <br />

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
