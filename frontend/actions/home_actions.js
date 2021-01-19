import * as ApiUtil from '../util/home_api_util'

export const RECEIVE_DISABLED_LISTINGS = 'RECEIVE_DISABLED_LISTINGS'

export const getDisabledListingsByUserId = (
  userId,
  page,
  sortOption,
  filters
) => {
  return (dispatch) => {
    return ApiUtil.getDisabledListingsByUserId(
      userId,
      page,
      sortOption,
      filters
    ).then(({ disabled_listings, page, total_pages }) => {
      return dispatch({
        type: RECEIVE_DISABLED_LISTINGS,
        disabledListings: disabled_listings,
        page,
        pages: total_pages
      })
    })
  }
}
