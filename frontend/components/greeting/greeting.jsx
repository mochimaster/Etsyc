import React from 'react'

const Greeting = ({ openModal }) => (
  <React.Fragment>
    <li>
      <button
        className="header-nav-register"
        onClick={() => openModal('signup')}
      >
        Register
      </button>
    </li>
    <li id="sign-in-link" className="sign-in-link">
      <button className="header-nav-signin" onClick={() => openModal('login')}>
        Sign In
      </button>
    </li>
    <li id="demo-sign-in-link" className="sign-in-link">
      <button
        className="header-nav-signin demo-sign-in-link"
        onClick={() => openModal('demo')}
      >
        Demo User
      </button>
    </li>
  </React.Fragment>
)

export default Greeting
