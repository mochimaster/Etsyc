import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import {connect} from 'react-redux';
import LogInFormContainer from '../session_form/login_form_container';
import SignUpFormContainer from '../session_form/signup_form_container';
import UserDropdownContainer from '../user_dropdown/user_dropdown_container';

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
    case 'profileDropdown':
      component = <UserDropdownContainer />;
      break;

    default:
      return null;
  }

  // const darkBackground =
  //     <div className="modal-background" onClick={closeModal}>
  //       <div className="modal-child" onClick={e => e.stopPropagation()}>
  //         { component }
  //       </div>
  //     </div>
  //
  // const clearBackground =
  //     <div className="modal-background-clear" onClick={closeModal}>
  //       <div className="modal-child" onClick={e => e.stopPropagation()}>
  //         { component }
  //       </div>
  //     </div>
  //
  // let backGroundModal = ""
  // if (modal = 'profileDropdown') {
  //   backGroundModal = clearBackground
  // } else {
  //   backGroundModal = darkBackground
  // }
  // debugger
  let backGroundModal = "";
  // debugger
  (modal === 'profileDropdown') ? backGroundModal = 'modal-clear-background' : backGroundModal = 'modal-background'
  return (
    <div className={backGroundModal} onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
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
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
