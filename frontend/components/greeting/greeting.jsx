import React from 'react'

import { MODAL_TYPE } from '../../../utils/constants'
import { addMobileClassName } from '../../../utils/helper'

const Greeting = ({ openModal }) => (
  <React.Fragment>
    <li className={addMobileClassName('sign-in-link')}>
      {isMobile ? (
        <i
          class="fas fa-user-plus"
          onClick={() => openModal(MODAL_TYPE.SIGN_UP)}
        ></i>
      ) : (
        <button
          className={`header-nav-register ${
            isMobile ? 'header-nav-register-mobile' : ''
          }`}
          onClick={() => openModal(MODAL_TYPE.SIGN_UP)}
        >
          Register
        </button>
      )}
    </li>
    <li id="sign-in-link" className={addMobileClassName('sign-in-link')}>
      {isMobile ? (
        <i
          class="fas fa-sign-in-alt"
          onClick={() => openModal(MODAL_TYPE.LOGIN)}
        ></i>
      ) : (
        <button
          className={`header-nav-signin ${
            isMobile ? 'header-nav-signin-mobile' : ''
          }`}
          onClick={() => openModal(MODAL_TYPE.LOGIN)}
        >
          Sign In
        </button>
      )}
    </li>
    {/* <li id="demo-sign-in-link" className="sign-in-link">
      <button
        className="header-nav-signin demo-sign-in-link"
        onClick={() => openModal(MODAL_TYPE.DEMO)}
      >
        Demo User
      </button>
    </li> */}
  </React.Fragment>
)

export default Greeting
