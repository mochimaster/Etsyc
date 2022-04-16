import * as ApiUtil from '../util/home_api_util'

export const RECEIVE_DISABLED_LISTINGS = 'RECEIVE_DISABLED_LISTINGS'
export const RECEIVE_CREDENTIAL_UPDATED = 'RECEIVE_CREDENTIAL_UPDATED'
export const RECEIVE_CREDENTIAL_ERRORS = 'RECEIVE_CREDENTIAL_ERRORS'

export const getDisabledListingsByUserId = (
  userId,
  page,
  sortOption,
  filters,
  search = ''
) => {
  return (dispatch) => {
    return ApiUtil.getDisabledListingsByUserId(
      userId,
      page,
      sortOption,
      filters,
      search
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

export const resetPassword = (credential) => (dispatch) =>
  ApiUtil.resetPassword(credential).then(
    (response, _, { status }) =>
      dispatch({
        type: RECEIVE_CREDENTIAL_UPDATED,
        response,
        status
      }),
    ({ responseJSON, status }) =>
      dispatch({
        type: RECEIVE_CREDENTIAL_ERRORS,
        status,
        response: responseJSON
      })
  )
