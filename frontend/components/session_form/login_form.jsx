import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { FORM_TYPE } from '../../../utils/constants'

const LoginForm = (props) => {
  const { formType } = props

  const [username, setUsername] = useState(
    formType === FORM_TYPE.DEMO ? 'demouser' : ''
  )
  const [password, setPassword] = useState(
    formType === FORM_TYPE.DEMO ? 'password' : ''
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { username, password }

    formType === FORM_TYPE.SIGN_UP
      ? props.signup(user).then(() => {
          props.closeModal()
          props.history.push('/')
        })
      : props.login(user).then(() => {
          props.closeModal()
          props.history.push('/')
        })
  }

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const renderErrors = () => {
    return (
      <ul>
        {props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    )
  }

  let headerMessage = ''
  let headerSubMessage = ''
  let className = ''
  if (formType === FORM_TYPE.SIGN_UP) {
    headerMessage = 'Create your account'
    headerSubMessage = 'Registration is easy.'
    className = 'login-input'
  } else {
    headerMessage = 'Sign in to continue'
    className = 'demo-login-input'
  }

  const buttonText =
    formType === FORM_TYPE.DEMO
      ? 'Sign in as demo user'
      : formType === FORM_TYPE.SIGN_UP
      ? 'Register'
      : 'Sign In'

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form-modal">
        <div onClick={props.closeModal} className="close-x"></div>

        <div className="modal-sign-in-container">
          <div className="modal-sign-in-h1">
            <div>{headerMessage}</div>
            <p>{headerSubMessage}</p>
          </div>

          <div className="error-messages-container">
            <div className="error-messages">{renderErrors()}</div>
          </div>

          <div>
            <label className="modal-email-address-title">
              Email address
              <input
                id="username-input"
                className={className}
                type="text"
                autocomplete="on"
                value={username}
                onChange={formType === FORM_TYPE.DEMO ? () => {} : updateUsername}
              />
            </label>
          </div>

          <div>
            <label className="modal-email-password-title">
              Password
              <input
                id="username-password"
                className={className}
                type="password"
                autocomplete="on"
                value={password}
                onChange={formType === FORM_TYPE.DEMO ? () => {} : updatePassword}
              />
            </label>
          </div>

          <div className="modal-button-action-container">
            <button
              className="session-submit btn"
              type="submit"
              value="Sign In"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default withRouter(LoginForm)
