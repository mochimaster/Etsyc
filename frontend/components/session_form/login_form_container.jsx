import { connect } from 'react-redux'

import { login, signup } from '../../actions/session_actions'
import { closeModal } from '../../actions/modal_actions'

import LoginForm from './login_form'

const mapStateToProps = (state) => {
  return {
    session: state.session.id,
    errors: state.errors.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
