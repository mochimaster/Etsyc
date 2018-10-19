import React from 'react';
import ReviewIndex from './review_index';
import {getReviews, updateReview, deleteReview} from '../../actions/review_actions';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
  if(!state.entities.reviews){
    return null;
  }
  return {
    reviews: Object.values(state.entities.reviews)

  };
};


const mapDispatchToProps = dispatch => {
  return {
    getReviews: (listingIds) => dispatch(getReviews(listingIds)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewIndex);
