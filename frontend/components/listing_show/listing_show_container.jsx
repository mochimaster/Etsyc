import React from 'react'
import { connect } from 'react-redux'
import {
  getListing,
  updateListing,
  deleteListing,
  renewListing
} from '../../actions/listing_actions'
import ListingShow from './listing_show'
import { createCart } from '../../actions/cart_actions'
import { openModal } from '../../actions/modal_actions'

const mapStateToProps = (state, ownProps) => {
  return {
    listing: state.entities.listings[ownProps.match.params.listingId],
    sessionId: state.session.id,
    merchantName: state.session.id
      ? state.entities.users[state.session.id].merchant_name
      : ''
  }
}

// const benchId = parseInt(match.params.benchId);
// const bench = selectBench(state.entities, benchId);
// const reviews = selectReviewsForBench(state.entities, bench);
// return {
//   benchId,
//   bench,
//   reviews
// };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    getListing: (id) => dispatch(getListing(id)),
    updateListing: (listing) => dispatch(updateListing(listing)),
    deleteListing: (id) => dispatch(deleteListing(id)),
    createCart: (cart) => dispatch(createCart(cart)),
    openModal: (modal) => dispatch(openModal(modal)),
    renewListing: (id) => dispatch(renewListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingShow)
