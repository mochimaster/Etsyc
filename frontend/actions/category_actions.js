import * as ApiUtil from '../util/category_api_util'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_LISTINGS = "RECEIVE_LISTINGS";

export const getListingsByCategory = (category, page = 1, sortOption) => {
    return dispatch => {
        return ApiUtil.getListingsByCategory(category, page, sortOption).then(listings => {
            // debugger
            dispatch({ type: RECEIVE_LISTINGS, listings });
        })
    }
}