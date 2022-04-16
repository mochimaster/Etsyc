import React, { useEffect, useState } from 'react'

const HomeForm = ({
  session,
  username,
  resetPassword,
  resetPasswordResponse
}) => {
  const [credential, setCredential] = useState({ session, username })
  const [statusResponse, setStatusResponse] = useState()
  const [response, setResponse] = useState()

  useEffect(() => {
    setStatusResponse(resetPasswordResponse.status)
    setResponse(resetPasswordResponse.response)
  }, [resetPasswordResponse])

  useEffect(() => {
    if (statusResponse === 201) {
      alert('New password set successfully.')
    }

    if (statusResponse === 401) {
      alert(
        `New password failed to save. Please try again. Error: ${response[0]}`
      )
    }

    setCredential({
      ...credential,
      existingPassword: '',
      newPassword1: '',
      newPassword2: ''
    })

    setStatusResponse()
    setResponse()
  }, [statusResponse, response])

  const handleUpdate = (value, field) => {
    setCredential({ ...credential, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const [validPassword, error] = isValidPassword(
      credential.newPassword1,
      credential.newPassword2
    )

    setCredential({ ...credential, newPassword1: '', newPassword2: '' })

    validPassword ? resetPassword(credential) : alert(error)
  }

  const isValidPassword = (newPassword1, newPassword2) => {
    if (newPassword1 !== newPassword2) {
      return [false, 'New password does not match with confirm new passowrd.']
    }

    if (newPassword1.length < 5) {
      return [false, 'New Password must to be at least 6 characters long.']
    }

    return [true]
  }

  return (
    <div className="home-reset-password">
      <form onSubmit={handleSubmit}>
        <h1 className="password-header">Pasword Reset:</h1>
        <br />
        <br />
        <div className="password-form-container form">
          <div className="reset-field">
            <label className="reset-label">Username: </label>
            <div className="reset-input">{username}</div>
          </div>
          <div className="reset-field">
            <label className="reset-label">Existing Password:</label>
            <input
              className="reset-input"
              type="password"
              onChange={({ target: { value } }) =>
                handleUpdate(value, 'existingPassword')
              }
              value={credential.existingPassword}
            />
          </div>
          <div className="reset-field">
            <label className="reset-label">New Password:</label>
            <input
              className="reset-input"
              type="password"
              onChange={({ target: { value } }) =>
                handleUpdate(value, 'newPassword1')
              }
              value={credential.newPassword1}
            />
          </div>
          <div className="reset-field">
            <label className="reset-label">Confirm New Password:</label>
            <input
              className="reset-input"
              type="password"
              onChange={({ target: { value } }) =>
                handleUpdate(value, 'newPassword2')
              }
              value={credential.newPassword2}
            />
          </div>
          <div className="reset-field">Note* : New passwords must match.</div>
        </div>
        <br />
        <br />
        <br />
        <button className="submit-button btn-primary btn">Submit</button>
      </form>
    </div>
  )
}

export default HomeForm
