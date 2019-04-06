import { RECEIVE_LISTING, RECEIVE_LISTINGS, REMOVE_LISTING } from '../actions/listing_actions';
import { RECEIVE_CARTS, RECEIVE_CART } from '../actions/cart_actions';
import merge from 'lodash/merge';

const paginationReducer = (oldState={}, action) => {
    Object.freeze(oldState)

    switch (action.type) {
      case RECEIVE_LISTINGS:
        const pagination = {};

        pagination["page"] = action.listings.page;
        pagination["pages"] = action.listings.pages;

        return pagination;

      default:
        return oldState
    }
}

export default paginationReducer;