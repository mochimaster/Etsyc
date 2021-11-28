import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import ListingForm from './listing_form'

import { createListing } from '../../actions/listing_actions'
import { createReview } from '../../actions/review_actions'
import { clearErrors } from '../../actions/listing_actions'

const mapStateToProps = (state, ownProps) => {
  if (isEmpty(state.entities.listings)) {
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

  const {
    title,
    description,
    overview,
    category,
    price,
    photo,
    author_id,
    phoneNumber,
    photoUrls
  } = Object.values(state.entities.listings)[0]

  return {
    listing: {
      title: title ? title : '',
      description: description || '',
      category: category || '',
      overview: overview || '',
      price: price || null,
      photo: photo || photoUrls || null,
      author_id: author_id || null,
      phoneNumber: phoneNumber || '',
      photoUrls: photoUrls || []
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
    createReview: (review) => dispatch(createReview(review)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm)
