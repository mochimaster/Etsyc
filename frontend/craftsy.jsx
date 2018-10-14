import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'

import {signup, login, logout} from './actions/session_actions'
// import {signup, login, logout} from './util/session_api_util'

import {createListing, updateListing, getListing, getListings,deleteListing} from './actions/listing_actions';



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

  window.createListing = createListing;
  window.updateListing = updateListing;
  window.getListing = getListing;
  window.getListings = getListings;
  window.deleteListing = deleteListing;



  ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
})
