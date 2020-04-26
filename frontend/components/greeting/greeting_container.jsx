import { connect } from 'react-redux'

import Greeting from './greeting'

import { openModal } from '../../actions/modal_actions'

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal))
  }
}

export default connect((state) => state, mapDispatchToProps)(Greeting)
