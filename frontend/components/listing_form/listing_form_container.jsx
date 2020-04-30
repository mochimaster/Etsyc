import { connect } from 'react-redux'

import ListingForm from './listing_form'

import { createListing } from '../../actions/listing_actions'
import { createReview } from '../../actions/review_actions'

const mapStateToProps = (state) => {
  return {
    listing: {
      title: '',
      description: '',
      category: '',
      price: null,
      photo: null,
      author_id: null,
      phoneNumber: ''
    },
    sessionId: state.session.id,
    merchantName: state.entities.users[state.session.id].merchant_name,
    phoneNumber: state.entities.users[state.session.id].phone_number,
    formType: 'Create Listing',
    errors: state.errors.listing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: (listing) => dispatch(createListing(listing)),
    createReview: (review) => dispatch(createReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm)
