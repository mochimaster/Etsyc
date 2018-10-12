import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import {connect} from 'react-redux';
import LogInFormContainer from '../session_form/login_form_container';
import SignUpFormContainer from '../session_form/signup_form_container';
import DemoSessionFormContainer from '../session_form/demo_login_form_container';
import UserDropdownContainer from '../user_dropdown/user_dropdown_container';
import {clearErrors} from '../../actions/session_actions';

function Modal({modal, closeModal}) {
  if(!modal) {
    return null;
  }

  let component;
  switch (modal) {
    case 'login':
      component = <LogInFormContainer />;
      break;
    case 'signup':
      component = <SignUpFormContainer />;
      break;
    case 'demo':
      component = <DemoSessionFormContainer />;
      break;
    case 'profileDropdown':
      component = <UserDropdownContainer />;
      break;

    default:
      return null;
  }


  let backGroundModal = "";
  let childModalType = "";
  // debugger
  (modal === 'profileDropdown') ? backGroundModal = 'modal-clear-background' : backGroundModal = 'modal-background';
  (modal === 'profileDropdown') ? childModalType = 'modal-child-profile-dropdown' : childModalType = 'modal-child';
  return (
    <div className={backGroundModal} onClick={closeModal}>
      <div className={childModalType} onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
     (dispatch(closeModal()))
     dispatch(clearErrors())
   }



  };
};

// closeModal: () => {
//  console.dir(dispatch(closeModal()))
//  dispatch(console.log())
// }

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
