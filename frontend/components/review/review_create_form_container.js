import {connect} from 'react-redux';
import {createReview} from '../../actions/review_actions';
import ReviewForm from './review_form';

const mapStateToProps = (state,ownProps) => {
  return {
    formType: 'Create Review',
    sessionId: state.session.id,
    // listing: ownProps.match.params.listingId,
    // listing: ownProps.match.params.listingId,
    review: {body: "", rating:null, listing_id: ownProps.listingId},
    listingId: ownProps.listingId
  };
};


const mapDispatchToProps = dispatch => {
  return {
    action: (review) => dispatch(createReview(review))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
