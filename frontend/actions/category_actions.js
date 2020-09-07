import * as ApiUtil from '../util/category_api_util'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'

export const getListingsByCategory = (
  category,
  page = 1,
  sortOption,
  filters
) => {
  console.log('getListingsByCategory filters: ', filters)
  return (dispatch) => {
    return ApiUtil.getListingsByCategory(
      category,
      page,
      sortOption,
      filters
    ).then((listings) => {
      dispatch({ type: RECEIVE_LISTINGS, listings })
    })
  }
}
