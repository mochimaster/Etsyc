import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './store/store'

import Root from './components/root'

import { identifyUser } from '../utils/track'

document.addEventListener('DOMContentLoaded', () => {
  let store
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    }
    store = configureStore(preloadedState)
    identifyUser(window.currentUser)

    delete window.currentUser
  } else {
    store = configureStore()
  }

  ReactDOM.render(<Root store={store} />, document.getElementById('root'))
})
