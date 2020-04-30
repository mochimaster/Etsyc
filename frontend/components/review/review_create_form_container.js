import { connect } from 'react-redux'

import ReviewForm from './review_form'

import { createReview } from '../../actions/review_actions'

const mapStateToProps = (state, ownProps) => {
  return {
    formType: 'Create Review',
    sessionId: state.session.id,
    review: { body: '', rating: null, listing_id: ownProps.listingId },
    listingId: ownProps.listingId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: (review) => dispatch(createReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
