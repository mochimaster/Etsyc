import { connect } from 'react-redux'
import ListingForm from './listing_form'

import { updateListing, getListing } from '../../actions/listing_actions'
import { clearErrors } from '../../actions/listing_actions'

const mapStateToProps = (state, ownProps) => {
  // debugger;
  return {
    listing: state.entities.listings[ownProps.match.params.listingId],
    sessionId: state.session.id,
    formType: 'Edit Listing',
    errors: state.errors.listing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: (listing) => dispatch(updateListing(listing)),
    getListing: (id, userId) => dispatch(getListing(id, userId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm)
