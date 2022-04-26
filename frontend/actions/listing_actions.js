import * as ApiUtil from '../util/listing_api_util'

export const RECEIVE_LISTING = 'RECEIVE_LISTING'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'
export const REMOVE_LISTING = 'REMOVE_LISTING'
export const RECEIVE_LISTING_ERRORS = 'RECEIVE_LISTING_ERRORS'
export const CLEAR_LISTING_ERRORS = 'CLEAR_LISTING_ERRORS'
export const RECEIVE_TEMP_CART_LISTING = 'RECEIVE_TEMP_CART_LISTING'
export const REMOVE_TEMP_CART_LISTING = 'REMOVE_TEMP_CART_LISTING'
export const RECEIVE_TEMP_CART_LISTINGS = 'RECEIVE_TEMP_CART_LISTINGS'

export const createListing = (listing) => {
  return (dispatch) => {
    return ApiUtil.createListing(listing).then(
      (listing) => {
        dispatch({ type: RECEIVE_LISTING, listing })
      },
      (errors) => {
        dispatch({
          type: RECEIVE_LISTING_ERRORS,
          errors: errors.responseJSON
        })
      }
    )
  }
}

export const updateListing = (listing) => {
  return (dispatch) => {
    return ApiUtil.updateListing(listing).then(
      (listing) => {
        dispatch({ type: RECEIVE_LISTING, listing })
      },
      (errors) => {
        dispatch({
          type: RECEIVE_LISTING_ERRORS,
          errors: errors.responseJSON
        })
      }
    )
  }
}

export const getListing = (id, userId) => {
  return (dispatch) => {
    return ApiUtil.getListing(id, userId).then((listing) => {
      dispatch({ type: RECEIVE_LISTING, listing })
    })
  }
}

export const getListings = (page = 1, sortOption, filters) => {
  return (dispatch) => {
    return ApiUtil.getListings(page, sortOption, filters).then((listings) => {
      dispatch({ type: RECEIVE_LISTINGS, listings })
    })
  }
}

export const deleteListing = (id) => {
  return (dispatch) => {
    return ApiUtil.deleteListing(id).then((listing) => {
      dispatch({ type: REMOVE_LISTING, listingId: id })
    })
  }
}

export const clearErrors = () => (dispatch) =>
  dispatch({
    type: CLEAR_LISTING_ERRORS
  })

export const searchListing = (title, page = 1) => {
  return (dispatch) => {
    return ApiUtil.listingSearch(title, page).then((listings) => {
      dispatch({ type: RECEIVE_LISTINGS, listings })
    })
  }
}

export const renewListing = (id) => (dispatch) =>
  ApiUtil.renewListing(id).then((listing) =>
    dispatch({ type: RECEIVE_LISTING, listing })
  )

export const getDuplicateListing = (listing) => (dispatch) =>
  dispatch({ type: RECEIVE_LISTING, listing })

export const getTempCartListing = (id, quantity) => (dispatch) =>
  ApiUtil.getListing(id).then((listing) => {
    dispatch({
      type: RECEIVE_TEMP_CART_LISTING,
      listing: { ...listing, quantity }
    })
  })

export const getTempCartListings = (listingIds) => (dispatch) => {
  if (listingIds.length < 1) return
  return ApiUtil.getListingsByIds(listingIds).then(({ listings }) => {
    /**
     * {
     * listings: [{},{}],
     * page: 1,
     * total_pages: 1
     * }
     */
    dispatch({
      type: RECEIVE_TEMP_CART_LISTINGS,
      cart: listings
    })
  })
}

export const removeTempCartListing = (id) => (dispatch) =>
  dispatch({ type: REMOVE_TEMP_CART_LISTING, id })

export const updateTempCartListings = (cart) => (dispatch) =>
  dispatch({ type: RECEIVE_TEMP_CART_LISTINGS, cart })
