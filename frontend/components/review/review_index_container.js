import { connect } from 'react-redux'

import ReviewIndex from './review_index'

import { getReviews, deleteReview } from '../../actions/review_actions'

const mapStateToProps = (state) => {
  return state.entities.reviews
    ? { reviews: Object.values(state.entities.reviews) }
    : {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: (listingIds) => dispatch(getReviews(listingIds)),
    deleteReview: (reviewId) => dispatch(deleteReview(reviewId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewIndex)
