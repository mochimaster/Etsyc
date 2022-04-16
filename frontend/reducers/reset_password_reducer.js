import { merge } from 'lodash'

import {
  RECEIVE_CREDENTIAL_ERRORS,
  RECEIVE_CREDENTIAL_UPDATED
} from '../actions/home_actions'

const resetPasswordReducer = (oldState = {}, { type, response, status }) => {
  let newState = merge({}, oldState)
  switch (type) {
    case RECEIVE_CREDENTIAL_UPDATED:
      return merge(newState, { response, status })

    case RECEIVE_CREDENTIAL_ERRORS:
      return merge(newState, { response, status })

    default:
      return oldState
  }
}

export default resetPasswordReducer
