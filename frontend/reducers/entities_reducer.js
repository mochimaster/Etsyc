import { combineReducers } from 'redux'
import usersReducer from './users_reducer'
import listingsReducer from './listings_reducer'
import cartsReducer from './carts_reducer'
import reviewReducer from './reviews_reducer'
import paginationReducer from './pagination_reducer'
import categoriesReducer from './categories_reducer'
import sortReducer from './sort_reducer'
import homeReducer from './home_reducer'
import filterReducer from './filters_reducer'
import resetPasswordReducer from './reset_password_reducer'
import tempCartsReducer from './temp_carts_reducer'

const entitiesReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer,
  disabledListings: homeReducer,
  carts: cartsReducer,
  tempCarts: tempCartsReducer,
  reviews: reviewReducer,
  pagination: paginationReducer,
  categories: categoriesReducer,
  sortOption: sortReducer,
  filters: filterReducer,
  resetPassword: resetPasswordReducer
})

export default entitiesReducer
