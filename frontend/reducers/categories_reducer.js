import { RECEIVE_CATEGORIES } from "../actions/category_actions";
import merge from "lodash/merge";

const categoriesReducer = (oldState={}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
      case RECEIVE_CATEGORIES:
        const listings = {};
        return action.categories.listings;

      default:
        return oldState;
    }
}

export default categoriesReducer;