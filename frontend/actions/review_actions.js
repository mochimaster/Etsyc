import * as ApiUtil from '../util/review_api_util';

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';

export const createReview = review => {
  return dispatch => {
    return ApiUtil.createReview(review).then( review => {
      dispatch({type: RECEIVE_REVIEW, review});
    });
  };
};

export const getReview = review => {
  return dispatch => {
    return ApiUtil.getReview(review).then( review => {
      dispatch({type: RECEIVE_REVIEW, review});
    });
  };
};

export const getReviews = (listing) => {
  return dispatch => {
    // maybe change the data fetched from backend as payload
    return ApiUtil.getReviews(listing).then( (review) => {
      dispatch({type: RECEIVE_REVIEWS, review});
    });
  };
};

export const updateReview = (review) => {
  return dispatch => {
    return ApiUtil.updateReview(review).then( review => {
      dispatch({type: RECEIVE_REVIEW, review});
    });
  };
};



export const deleteReview = (review) => {
  return dispatch => {
    return ApiUtil.deleteReview(review.id).then( () => {
      dispatch({type: REMOVE_REVIEW, review});
    });
  };
};
