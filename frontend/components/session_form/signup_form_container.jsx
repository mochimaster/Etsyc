import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signup} from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
// import SessionForm from './session_form'
import SignUpForm from './signup_form'


const mapStateToProps = state => {
  return {
    session: state.session.id,
    errors: state.errors.session,
    formType: 'signup',
    navLink: <Link to="/login">Login instead.</Link>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('login'))}>
        Login
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
