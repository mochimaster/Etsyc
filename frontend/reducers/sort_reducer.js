import { SET_SORT } from '../actions/sort_actions'

const sortReducer = (oldState = "newest", action) => {
    switch (action.type) {
        case SET_SORT:
            return action.sortOption

        default:
            return oldState
    }
}

export default sortReducer