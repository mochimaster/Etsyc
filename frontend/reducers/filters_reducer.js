import { SET_CONDITION } from '../actions/filter_actions'
import { CONDITION } from '../../utils/constants'

const filterReducer = (oldState = { condition: CONDITION.ALL }, action) => {
  switch (action.type) {
    case SET_CONDITION:
      return { condition: action.condition }

    default:
      return oldState
  }
}

export default filterReducer
