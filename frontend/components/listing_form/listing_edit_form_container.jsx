import {connect} from 'react-redux';
import {updateListing, getListing} from '../../actions/listing_actions';
import ListingForm from './listing_form';

const mapStateToProps = (state,ownProps) => {
  // debugger;
  return {
    listing: state.entities.listings[ownProps.match.params.listingId],
    sessionId: state.session.id,
    formType: 'Edit Listing',
    errors: state.errors.listing

  }
}

const mapDispatchToProps = dispatch => {
  return {
    action: (listing) => dispatch(updateListing(listing)),
    getListing: (id) => dispatch(getListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);
