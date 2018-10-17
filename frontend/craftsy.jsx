import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'

import {signup, login, logout} from './actions/session_actions'
// import {signup, login, logout} from './util/session_api_util'

// import {createListing, updateListing, getListing, getListings,deleteListing} from './actions/listing_actions';
// import {createListing, updateListing, getListing, getListings,deleteListing} from './actions/listing_actions';
// import {createListing, updateListing, getListing, getListings,deleteListing} from './util/listing_api_util';
// import {getCarts, getCart, updateCart, createCart,deleteCart} from './util/cart_api_util';
import {getCarts, getCart, updateCart, createCart, deleteCart} from './actions/cart_actions';


document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser){
    const preloadedState = {
      entities:{
        users: {[window.currentUser.id]: window.currentUser}
      },
      session: {id: window.currentUser.id}
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }


  window.login = login;
  // const store = configureStore()
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  // window.createListing = createListing;
  // window.updateListing = updateListing;
  // window.getListing = getListing;
  // window.getListings = getListings;
  // window.deleteListing = deleteListing;

  window.getCarts = getCarts;
  window.getCart = getCart;
  window.updateCart = updateCart;
  window.createCart = createCart;
  window.deleteCart = deleteCart;



  ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
})
