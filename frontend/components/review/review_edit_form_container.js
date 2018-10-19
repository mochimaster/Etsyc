import {connect} from 'react-redux';
import {editReview, getReview} from '../../actions/review_actions';
import ReviewForm from './review_form';

const mapStateToProps = state => {

  return {
    formType: 'Create Review',
    sessionId: state.session.id,
    listing: state.listing,
    review: {body: "", rating: null}
  };
};


const mapDispatchToProps = dispatch => {
  return {
    getReview: (review) => dispatch(getReview(review)),
    action: (review) => dispatch(editReview(review))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
