import React from 'react'
import ReactLoading from 'react-loading'

import { merge, pull, omit } from 'lodash'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import ReviewIndexContainer from '../review/review_index_container'
import ReviewForm from '../review/review_create_form_container'
import ImageGallery from 'react-image-gallery'
import { Collapsible } from '../collapsible/collapsible'
import { CONDITION } from '../condition_slider/condition_slider'
import ConditionSlider from '../condition_slider/condition_slider_container'
import DeliveryOption from '../delivery_option/delivery_option'

import 'react-image-gallery/styles/css/image-gallery.css'

import { trackEvent, EVENTS } from '../../../utils/track'
import { addMobileClassName } from '../../../utils/helper'

class ListingShow extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()

    this.state = {
      quantity: 1,
      isLoading: true,
      isTracked: false,
      displayAddToCartToolTip: false,
      isPhotoFullscreen: false
    }

    this.updateListing = this.updateListing.bind(this)
  }

  updateQuantity(e) {
    this.setState({ quantity: parseInt(e.target.value) })
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    this.props
      .getListing(this.props.match.params.listingId, this.props.sessionId)
      .then(() => {
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

  displayMobilePhoneNumber() {
    if (this.props.listing.phoneNumber) {
      return (
        <div className={addMobileClassName('listing-seller-phone-number')}>
          <a href={'tel: '.concat(this.props.listing.phoneNumber)}>☎️ Call</a>

          <a
            href={`sms:+15109361639&body=Hi, I would like to inquire about item number ${this.props.listing.id} - ${this.props.listing.title}`}
          >
            💬 Text
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

  updateListing(payload) {
    this.props.updateListing({ id: this.props.listing.id, ...payload })
  }

  handleRenewListing(listing) {
    this.props.renewListing(listing.id).then(alert('Listing renewed.'))
  }

  handleDuplicateListing(listing) {
    this.props.duplicateListing({
      ...omit(listing, ['internalPhotoUrls', 'photoUrls', 'photosOrder']),
      title: listing.title.replaceAll('(PENDING)', '').trim()
    })
    this.props.history.push(`/listings/new`)
  }

  handleAddToCart() {
    trackEvent({
      eventName: EVENTS.ADD_TO_CART,
      eventProperties: { title: this.props.listing.description }
    })

    if (!this.props.sessionId) {
      const localStorageCartItems = window.localStorage.getItem('cartItems')
      const existingCarts =
        (localStorageCartItems && JSON.parse(localStorageCartItems)) || {}

      const mergedCarts = merge(existingCarts, {
        [this.props.listing.id]: {
          quantity: this.state.quantity
        }
      })

      window.localStorage.setItem('cartItems', JSON.stringify(mergedCarts))

      return this.props.history.push(`/users/temp/carts`)
    } else {
      return this.props
        .createCart({
          quantity: this.state.quantity,
          listing_id: this.props.listing.id,
          user_id: this.props.sessionId
        })
        .then(() =>
          this.props.history.push(`/users/${this.props.sessionId}/carts`)
        )
    }
  }

  render() {
    if (this.state.isLoading) {
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

    const displayAuthorButton = isListingAuthor && (
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

    let reviewForm
    if (this.props.sessionId) {
      reviewForm = <ReviewForm listingId={this.props.listing.id} />
    } else {
      reviewForm = (
        <div className="review-input">Please sign in to leave a review.</div>
      )
    }

    const images = []
    if (this.props.listing.photoUrls && this.props.listing.photoUrls.length) {
      const unorderedPhotoUrls = [...this.props.listing.photoUrls]

      this.props.listing.photosOrder.forEach((photoOrder) => {
        pull(unorderedPhotoUrls, photoOrder)

        images.push({
          original: photoOrder,
          thumbnail: photoOrder
          // originalHeight: isMobile ? 825 : undefined
        })
      })

      for (const unorderedPhotoUrl of unorderedPhotoUrls) {
        images.push({
          original: unorderedPhotoUrl,
          thumbnail: unorderedPhotoUrl
        })
      }
    }

    if (this.props.listing.photoUrl) {
      images.push({
        original: this.props.listing.photoUrl,
        thumbnail: this.props.listing.photoUrl
      })
    }

    const internalImages = []
    if (this.props.listing.internalPhotoUrls) {
      for (const internalPhotoUrl of this.props.listing.internalPhotoUrls) {
        internalImages.push({
          original: internalPhotoUrl,
          thumbnail: internalPhotoUrl
        })
      }
    }

    let itemNumber = this.props.match.params.listingId
    while (itemNumber.length <= 4) {
      itemNumber = '0' + itemNumber
    }

    const displaySellerName = (
      <div className="listing-header-seller-name">
        <Link
          className="listing-seller-name"
          to={`/users/${this.props.listing.author_id}/listings`}
        >
          {this.props.listing.merchantName}
        </Link>
      </div>
    )

    const displayPhoneNumber = (
      <div className="listing-seller-phone">
        {isMobile ? this.displayMobilePhoneNumber() : this.phoneNumberExist()}
      </div>
    )

    const displayDeliveryAndPickUp = (
      <div className="delivery-estimate">
        <DeliveryOption />
        <div>
          Free pick up at our warehouse in Hayward.{' '}
          <HashLink to="/visit#book-directions">Directions</HashLink>.
        </div>
      </div>
    )

    const displayAddToCartButton = (
      <div className="listing-details add-to-cart">
        <button
          className={`btn ${addMobileClassName('btn-primary')} add-to-cart`}
          onClick={this.handleAddToCart.bind(this)}
        >
          Add to cart
        </button>
      </div>
    )

    const displayBookAppointmentButton = (
      <div className="listing-details">
        <Link
          className={`btn ${addMobileClassName('btn-primary')} add-to-cart`}
          to="/visit"
          style={{
            width: '100%',
            ...(isMobile && { paddingTop: '15px', marginTop: 0 })
          }}
        >
          Book Appointment
        </Link>
      </div>
    )

    const displayQuantity = (
      <div className="listing-details listing-details-quantity">
        Quantity <br />
        <input
          className="input-quantity input-quantity-input"
          onChange={this.updateQuantity.bind(this)}
          // className="select-custom"
          placeholder="1"
        />
      </div>
    )

    const displayQuantityMobile = (
      <div className="listing-details listing-details-quantity quantity-buttons-container-mobile">
        Quantity:{' '}
        <button
          className="btn-secondary quantity-button-mobile quantity-button-left-mobile"
          onClick={() => {
            if (this.state.quantity <= 1) return
            this.setState({ quantity: this.state.quantity - 1 })
          }}
        >
          -
        </button>
        {/* <input
          className="quantity-value-mobile"
          placeholder="QTY"
          value={this.state.quantity}
          type="number"
          onChange={(e) => this.setState({ quantity: e.target.value })}
        ></input> */}
        <p className="quantity-value-mobile">{this.state.quantity}</p>
        <button
          className="btn-secondary quantity-button-mobile quantity-button-right-mobile"
          onClick={() => this.setState({ quantity: this.state.quantity + 1 })}
        >
          +
        </button>
      </div>
    )

    const displayCondition = (
      <div className="listing-details listing-details-condition">
        <label className="condition-label">Condition: </label>
        {this.props.listing.condition}
      </div>
    )

    const displayItemNumber = <div>Item number: {itemNumber}</div>

    const displayOverview = (
      <div className="listing-details listing-details-overview">
        <label className={addMobileClassName('title-label')}>Overview</label>
        <p className={addMobileClassName('overview')}>
          {this.props.listing.overview}
        </p>
      </div>
    )

    const displayInternalNote = isListingAuthor && (
      <div className="listing-details listing-details-internal-note">
        <label className="internal-note-label">Internal Note</label>
        <p className="internal-note">{this.props.listing.internalNote}</p>
      </div>
    )

    const displayPrice = (
      <div className="listing-details-price-container">
        <div className="listing-details listing-details-price">
          ${this.props.listing.price}
        </div>
        {this.props.listing.msrp && (
          <>
            {!isMobile && (
              <div className="listing-details listing-details-divider">|</div>
            )}
            <div
              className="listing-details listing-details-msrp"
              style={{ textDecoration: 'line-through' }}
            >
              ${this.props.listing.msrp}
            </div>
            {!isMobile && (
              <div className="listing-details listing-details-divider">|</div>
            )}
            <div className="listing-details listing-details-percentage">
              {Math.round(
                (1 - this.props.listing.price / this.props.listing.msrp) * 100,
                2
              )}
              % Off
            </div>
          </>
        )}
      </div>
    )

    const displayTitle = (
      <div className="listing-details listing-details-title">
        {this.props.listing.title} {isMobile ? '' : `  (${itemNumber})`}
      </div>
    )

    const displayBrand = this.props.listing.brand && (
      <div className="listing-details listing-details-brand">
        <label className="condition-label">Brand: </label>
        {this.props.listing.brand}
      </div>
    )

    const displayInternalPhotos = isListingAuthor &&
      this.props.listing.internalPhotoUrls &&
      this.props.listing.internalPhotoUrls.length > 0 && (
        <div>
          <br />
          <label className={addMobileClassName('title-label')}>
            Internal Photos
          </label>
          <br />
          <ImageGallery items={internalImages} showPlayButton={false} />
        </div>
      )

    const displayPhotos = (
      <div id="image-gallery">
        <ImageGallery
          ref={this.myRef}
          showPlayButton={false}
          items={images}
          lazyLoad={true}
          slideOnThumbnailOver={true}
          showIndex={true}
          showFullscreenButton={false}
          showNav={isMobile ? false : true}
          indexSeparator=" of "
          onScreenChange={(isFullscreen) =>
            this.setState({ isPhotoFullscreen: isFullscreen })
          }
          renderCustomControls={() => (
            <button
              className={addMobileClassName('full-screen-button')}
              onClick={() => this.myRef.current.toggleFullScreen()}
            >
              {this.state.isPhotoFullscreen ? (
                <i class="fas fa-compress"></i>
              ) : (
                <i class="fas fa-expand"></i>
              )}
            </button>
          )}
        />
      </div>
    )

    const displayDescription = (
      <div className="listing-description">
        <label className={addMobileClassName('title-label')}>Description</label>{' '}
        <br />
        <p className={addMobileClassName('description')}>
          {this.props.listing.description}
        </p>
      </div>
    )

    const displayReview = (
      <>
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
      </>
    )

    const displayShareButton = navigator.share && (
      <button
        className={addMobileClassName('share-button')}
        onClick={() => {
          try {
            navigator.share({
              title: this.props.listing.title,
              url: `https://www.castleandchair.com/#${this.props.location.pathname}`
            })
          } catch (err) {
            alert(
              `Sorry, Share feature is not supported on your browser. Error ${err}`
            )
          }
        }}
      >
        <div className="share-button-svg"></div>
      </button>
    )

    const displayDetailedCondition = (
      <div>
        <ConditionSlider condition={this.props.listing.detailedCondition} />
      </div>
    )

    const displayCustomFullScreenButton = () => (
      <button
        className="full-screen-button-mobile"
        onClick={() => {
          const isPhotoFullscreen = this.myRef.current.state.isFullscreen
          this.setState({ isPhotoFullscreen })
          this.myRef.current.toggleFullScreen()
        }}
      >
        {this.state.isPhotoFullscreen ? (
          <i class="fas fa-compress"></i>
        ) : (
          <i class="fas fa-expand"></i>
        )}
      </button>
    )

    const displayDesktopView = (
      <div className="listing-show-content-wrapper">
        {displayAuthorButton}

        <div className={addMobileClassName('listing-show-body-wrapper')}>
          <div className="listing-image listing-left-half">
            {displayPhotos}
            {displayShareButton}

            {displayDescription}
            {displayReview}
            {displayInternalPhotos}
          </div>

          <div className="listing-details listing-right-half">
            {displaySellerName}
            {displayPhoneNumber}
            {displayBrand}
            {displayTitle}
            {displayPrice}

            {displayQuantity}
            {displayDeliveryAndPickUp}

            {displayBookAppointmentButton}
            {displayAddToCartButton}
            {displayItemNumber}
            <br />

            {this.props.listing.detailedCondition
              ? displayDetailedCondition
              : displayCondition}
            <br />

            {displayOverview}
            <br />

            {displayInternalNote}
          </div>
        </div>
      </div>
    )

    const displayMobileView = (
      <div className="listing-show-content-wrapper listing-show-content-wrapper-mobile">
        {displayAuthorButton}
        {/* <div className={addMobileClassName('listing-show-body-wrapper')}> */}
        <div className="title-price-container-mobile">
          {displayTitle}
          {displayPrice}
        </div>

        <div className="image-gallery-mobile">
          {images.length && displayPhotos}
          {images.length && displayShareButton}
        </div>
        {/* {displayBrand} */}
        <div className="below-image-gallery-mobile">
          <div className="item-number-condition-container-mobile">
            {!this.props.listing.detailedCondition && displayCondition}
            {displayItemNumber}
          </div>
          {this.props.listing.detailedCondition && displayDetailedCondition}
          <div className="quantity-mobile">{displayQuantityMobile}</div>
          <div className="add-to-cart-button-container-mobile">
            {displayAddToCartButton}
          </div>
          <div className="add-to-cart-button-container-mobile">
            {displayBookAppointmentButton}
          </div>
          {
            <div className="phone-number-delivery-tip-mobile">
              <div className="phone-number-mobile">{displayPhoneNumber}</div>
            </div>
          }
          <Collapsible
            title={'Overview'}
            content={this.props.listing.overview}
            expand={true}
          />
          <Collapsible
            title={'Description'}
            content={this.props.listing.description}
          />
          <Collapsible
            title={'Self pick up'}
            content={
              <div>
                Free pick up at our warehouse in Hayward.{' '}
                <HashLink to="/visit#book-directions">Directions</HashLink>.
              </div>
            }
          />
          <Collapsible
            title={'Get it delivered'}
            content={<DeliveryOption />}
          />
          <br />
          {displayInternalNote}
          {displayInternalPhotos}
        </div>
      </div>
      // </div>
    )

    return (
      <div>
        <Helmet>
          <title>{this.props.listing.title}</title>
          <meta property="og:title" content={this.props.listing.title}></meta>
          <meta name="description" content={this.props.listing.overview} />
          <meta
            property="og:description"
            content={this.props.listing.overview}
          />
          <meta
            property="og:image"
            content={
              images.length > 0 &&
              `https://www.castleandchair.com${images[0].original}`
            }
          />
          {/* <meta
            property="og:url"
            content={`https://www.castleandchair.com/%23/listings/${
              this.props.listing.id
            }/${encodeURIComponent(this.props.listing.title)}`}
          /> */}
          {/* <link
            rel="canonical"
            href={`https://www.castleandchair.com/#/listings/${this.props.listing.id}`}
          /> */}
        </Helmet>
        {isMobile ? displayMobileView : displayDesktopView}
      </div>
    )
  }
}
// {<option dangerouslySetInnerHTML={{ __html: quantityDropdown}} />}

// <img alt="test_image" src="https://i.etsystatic.com/17442787/r/il/6f8689/1640702720/il_570xN.1640702720_56of.jpg" />

export default ListingShow
