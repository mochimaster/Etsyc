import * as ApiUtil from '../util/listing_api_util';

export const RECEIVE_LISTING = 'RECEIVE_LISTING';
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const REMOVE_LISTING = 'REMOVE_LISTING';
export const RECEIVE_LISTING_ERRORS = 'RECEIVE_LISTING_ERRORS';
export const CLEAR_LISTING_ERRORS = 'CLEAR_LISTING_ERRORS';

export const createListing = (listing) => {
  return dispatch => {
    return ApiUtil.createListing(listing).then( listing => {
      dispatch({type: RECEIVE_LISTING, listing});
    },
    errors => {
      return dispatch({type: RECEIVE_LISTING_ERRORS, errors: errors.responseJSON});
    }
  );
  };
};

export const updateListing = (listing) => {
  return dispatch => {
    // debugger
    return ApiUtil.updateListing(listing).then( listing => {
      dispatch({type: RECEIVE_LISTING, listing});
    },
    errors => {
      return dispatch({type: RECEIVE_LISTING_ERRORS, errors: errors.responseJSON});
    }
  );
  };
};

export const getListing = (id) => {
  return dispatch => {
    return ApiUtil.getListing(id).then( listing => {
      dispatch({type: RECEIVE_LISTING, listing});
    });
  };
};

export const getListings = () => {
  return dispatch => {
    return ApiUtil.getListings().then( listings => {
      dispatch({type: RECEIVE_LISTINGS, listings});
    });
  };
};

export const deleteListing = (id) => {
  return dispatch => {
    return ApiUtil.deleteListing(id).then( (listing) => {
      dispatch({type: REMOVE_LISTING, listingId: id});
    });
  };
};

export const clearErrors = () => ({
  type: CLEAR_LISTING_ERRORS
});

export const searchListing = (title) => {
  return dispatch => {
    return ApiUtil.listingSearch(title).then(listings => {
      dispatch({type: RECEIVE_LISTINGS, listings})
    });
  };
};

