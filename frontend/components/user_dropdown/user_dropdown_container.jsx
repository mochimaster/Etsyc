import { connect } from 'react-redux'

import { logout } from '../../actions/session_actions'
import { openModal, closeModal } from '../../actions/modal_actions'

import UserDropdown from './user_dropdown'

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown)
