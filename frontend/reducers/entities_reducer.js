import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import listingsReducer from './listings_reducer';
import cartsReducer from './carts_reducer';
import reviewReducer from './reviews_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer,
  carts: cartsReducer,
  reviews: reviewReducer
});

export default entitiesReducer;
