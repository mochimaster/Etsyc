import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions'

const modalReducer = (oldState = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        modal: action.modal,
        images: action.images,
        currentIndex: action.currentIndex
      }

    case CLOSE_MODAL:
      return null

    default:
      return oldState
  }
}

export default modalReducer
