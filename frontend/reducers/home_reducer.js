import { RECEIVE_DISABLED_LISTINGS } from '../actions/home_actions'

const homeReducer = (oldState = [], action) => {
    Object.freeze(oldState)

    switch (action.type) {
        case RECEIVE_DISABLED_LISTINGS:
            return action.disabledListings

        default:
            return oldState
    }
}

export default homeReducer