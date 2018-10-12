import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

import DemoSessionForm from './demo_session_form'

const mapStateToProps = state => {
  return {
    session: state.session.id,
    errors: state.errors.session,
    formType: 'login',
    navLink: <Link to="/signup">Signup instead</Link>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(DemoSessionForm);
