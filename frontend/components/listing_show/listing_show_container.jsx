import React from 'react';
import {connect} from 'react-redux';
import {getListing, updateListing, deleteListing,getListings} from '../../actions/listing_actions';
import ListingShow from './listing_show';

const mapStateToProps = (state, ownProps) => {
  // debugger
  return ({
    listing: state.entities.listings[ownProps.match.params.listingId],
    sessionId: state.session.id

  })
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


const mapDispatchToProps = dispatch => {
  // debugger
  return {
    getListing: (id) => dispatch(getListing(id)),
    updateListing: (listing) => dispatch(updateListing(listing)),
    deleteListing: (id) => dispatch(deleteListing(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListingShow);
