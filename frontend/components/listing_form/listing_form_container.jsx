import {connect} from 'react-redux';
import {createListing,getListing} from '../../actions/listing_actions';
import ListingForm from './listing_form';
import {createReview} from '../review/review_create_form_container';

const mapStateToProps = state => {
  return {
    listing: {title: "", description: "", category: "", price:null,
              photo:null, author_id:null},
    sessionId: state.session.id,
    merchantName: state.entities.users[state.session.id].merchant_name,
    formType: 'Create Listing',
    errors: state.errors.listing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    action: (listing) => dispatch(createListing(listing)),
    createReview: (review) => dispatch(createReview(review))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);
