import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Slider from './slider'

import { openModal, closeModal } from '../../actions/modal_actions'

const mapStateToProps = (state, ownProps) => {
  return {
    listing: ownProps.images ||
      state.entities.listings[parseInt(ownProps.location.pathname.slice(10))]
        .photoUrls || [
        state.entities.listings[parseInt(ownProps.location.pathname.slice(10))]
          .photoUrl
      ] || [Object.values(state.entities.listings)[0].photoUrl],
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    },
    openModal: (modalType) => {
      dispatch(openModal(modalType))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider))
