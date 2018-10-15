import {connect} from 'react-redux';
import {createListing} from '../../actions/listing_actions';
import ListingForm from './listing_form';

const mapStateToProps = state => {
  debugger;
  return {
    listing: {title: "", description: "", category: "", price:null,
              photo:null, author_id:null},
    sessionId: state.session.id

  }
}

const mapDispatchToProps = dispatch => {
  return {
    createListing: (listing) => dispatch(createListing(listing))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);
