import * as ApiUtil from '../util/category_api_util'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_LISTINGS = "RECEIVE_LISTINGS";

export const getListingsByCategory = (category, page=1) => {
    return dispatch => {
        return ApiUtil.getListingsByCategory(category, page).then(listings => {
            // debugger
            dispatch({ type: RECEIVE_LISTINGS , listings});
        })
    }
}