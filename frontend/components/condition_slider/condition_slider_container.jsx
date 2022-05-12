import { connect } from 'react-redux'

import ConditionSlider from './condition_slider'

import { openModal } from '../../actions/modal_actions'

const mapDispatchToProps = (dispatch) => ({
  openModal: (modalType, modal) => dispatch(openModal(modalType, modal))
})

export default connect(_, mapDispatchToProps)(ConditionSlider)
