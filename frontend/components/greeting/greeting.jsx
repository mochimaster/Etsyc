import React from 'react'

import { MODAL_TYPE } from '../../../utils/constants'

const Greeting = ({ openModal }) => (
  <React.Fragment>
    <li>
      <button
        className="header-nav-register"
        onClick={() => openModal(MODAL_TYPE.SIGN_UP)}
      >
        Register
      </button>
    </li>
    <li id="sign-in-link" className="sign-in-link">
      <button className="header-nav-signin" onClick={() => openModal(MODAL_TYPE.LOGIN)}>
        Sign In
      </button>
    </li>
    <li id="demo-sign-in-link" className="sign-in-link">
      <button
        className="header-nav-signin demo-sign-in-link"
        onClick={() => openModal(MODAL_TYPE.DEMO)}
      >
        Demo User
      </button>
    </li>
  </React.Fragment>
)

export default Greeting
