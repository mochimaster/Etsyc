import { RECEIVE_LISTINGS } from '../actions/listing_actions'
import { RECEIVE_DISABLED_LISTINGS } from '../actions/home_actions'

const paginationReducer = (oldState = {}, action) => {
  Object.freeze(oldState)

  switch (action.type) {
    case RECEIVE_LISTINGS:
      const pagination = {}

      pagination['page'] = action.listings.page
      pagination['pages'] = action.listings.total_pages

      return pagination

    case RECEIVE_DISABLED_LISTINGS:
      const pagination2 = {}

      pagination2['page'] = action.page
      pagination2['pages'] = action.pages

      return pagination2

    default:
      return oldState
  }
}

export default paginationReducer
