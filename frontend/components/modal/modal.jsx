import React from 'react'
import { connect } from 'react-redux'

import { MODAL_TYPE } from '../../../utils/constants'

import LogInFormContainer from '../session_form/login_form_container'
import SignUpFormContainer from '../session_form/signup_form_container'
import UserDropdownContainer from '../user_dropdown/user_dropdown_container'
import DemoSessionFormContainer from '../session_form/demo_login_form_container'
import Slider from '../slider/slider_container'

import { closeModal } from '../../actions/modal_actions'
import { clearErrors } from '../../actions/session_actions'

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null
  }

  let modalComponent
  switch (modal) {
    case MODAL_TYPE.LOGIN:
      modalComponent = <LogInFormContainer />
      break
    case MODAL_TYPE.SIGN_UP:
      modalComponent = <SignUpFormContainer />
      break
    case MODAL_TYPE.DEMO:
      modalComponent = <DemoSessionFormContainer />
      break
    case MODAL_TYPE.PROFILE_DROPDOWN:
      modalComponent = <UserDropdownContainer />
      break
    case MODAL_TYPE.SLIDER:
      modalComponent = <Slider />
      break

    default:
      return null
  }

  let backGroundModal = 'modal-background'
  let childModalType = 'modal-child'

  if (modal === MODAL_TYPE.PROFILE_DROPDOWN) {
    backGroundModal = 'modal-clear-background'
    childModalType = 'modal-child-profile-dropdown'
  } else if (modal === MODAL_TYPE.SLIDER) {
    backGroundModal = 'modal-background modal-background-slider'
    childModalType = 'modal-child modal-child-slider'
  }

  return (
    <div className={backGroundModal} onClick={closeModal}>
      <div className={childModalType} onClick={(e) => e.stopPropagation()}>
        {modalComponent}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal())
      dispatch(clearErrors())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
