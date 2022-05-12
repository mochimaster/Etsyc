import React from 'react'
import { connect } from 'react-redux'

import { MODAL_TYPE, FORM_TYPE } from '../../../utils/constants'

import LogInFormContainer from '../session_form/login_form_container'
import UserDropdownContainer from '../user_dropdown/user_dropdown_container'
import Slider from '../slider/slider_container'

import { closeModal } from '../../actions/modal_actions'
import { clearErrors } from '../../actions/session_actions'
import { ConditionDetail } from '../condition_slider/condition_detail'

const Modal = ({ modal: propsModal, closeModal }) => {
  if (!propsModal) {
    return null
  }

  const { modal, images, currentIndex } = propsModal

  let modalComponent
  switch (modal) {
    case MODAL_TYPE.LOGIN:
      modalComponent = <LogInFormContainer formType={FORM_TYPE.LOGIN} />
      break
    case MODAL_TYPE.SIGN_UP:
      modalComponent = <LogInFormContainer formType={FORM_TYPE.SIGN_UP} />
      break
    case MODAL_TYPE.DEMO:
      modalComponent = <LogInFormContainer formType={FORM_TYPE.DEMO} />
      break
    case MODAL_TYPE.PROFILE_DROPDOWN:
      modalComponent = <UserDropdownContainer />
      break
    case MODAL_TYPE.SLIDER:
      modalComponent = <Slider images={images} currentIndex={currentIndex} />
      break
    case MODAL_TYPE.CONDITION_DETAIL:
      modalComponent = <ConditionDetail />
      break

    default:
      return null
  }

  let backGroundModal = 'modal-background'
  let childModalType = `modal-child ${isMobile ? 'modal-child-mobile' : ''}`

  if (modal === MODAL_TYPE.PROFILE_DROPDOWN) {
    backGroundModal = 'modal-clear-background'
    childModalType = `modal-child-profile-dropdown ${
      isMobile ? 'modal-child-profile-dropdown-mobile' : ''
    }`
  } else if (modal === MODAL_TYPE.SLIDER) {
    backGroundModal = 'modal-background modal-background-slider'
    childModalType = 'modal-child modal-child-slider'
  } else if (modal === MODAL_TYPE.CONDITION_DETAIL) {
    backGroundModal = 'modal-background modal-background-condition-detail'
    childModalType = 'modal-child modal-child-condition-detail'
  }

  return (
    <div className={backGroundModal} onClick={closeModal}>
      <div className={`${childModalType}`} onClick={(e) => e.stopPropagation()}>
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
