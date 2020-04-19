import * as ApiUtil from '../util/home_api_util';

export const RECEIVE_DISABLED_LISTINGS = 'RECEIVE_DISABLED_LISTINGS'

export const getDisabledListingsByUserId = (userId) => {
    return dispatch => {
        return ApiUtil.getDisabledListingsByUserId(userId).then(({ disabled_listings }) => {
            return dispatch({ type: RECEIVE_DISABLED_LISTINGS, disabledListings: disabled_listings })
        })
    }
}