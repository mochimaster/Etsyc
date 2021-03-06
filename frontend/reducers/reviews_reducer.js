import merge from 'lodash/merge';
import {RECEIVE_REVIEW, RECEIVE_REVIEWS, REMOVE_REVIEW} from '../actions/review_actions';


const reviewReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_REVIEW:
      let newState = merge({}, oldState);
      return merge(newState, {[action.review.id]: action.review});

    case RECEIVE_REVIEWS:
      if(Object.keys(action.review).length<1){
        return {};
      }

      return action.review.review;

    case REMOVE_REVIEW:
      let newState2 = merge({}, oldState);
      delete newState2[action.review.id];
      return newState2;

    default:
      return oldState;

  }
};

export default reviewReducer;
