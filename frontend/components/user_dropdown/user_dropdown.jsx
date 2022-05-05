import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const UserDropdown = (props) => {
  // currentUser: {id: num, username: str}

  const handleSubmit = () => {
    props.logout().then(() => {
      props.history.push('/')
    })
  }

  const username = props.currentUser ? props.currentUser.username : ''

  const isAdmin = props.currentUser && props.currentUser.username === 'kee'

  const headerButtonClassName = isMobile
    ? 'header-button header-button-mobile'
    : 'header-button'

  const addMobileClassName = (className) =>
    `${className} ${isMobile ? `${className}-mobile` : ''}`

  return (
    <div className={addMobileClassName('header-modal-profile')}>
      <ul className="modal-profile-dropdown-container">
        <li className="profile-dropdown-section1">
          <div className="header-modal-profile-picture">
            <a className="icon-profile-picture"> </a>
          </div>
          <div className="header-modal-username">{username}</div>
        </li>

        <li className="profile-dropdown-section2">
          {isAdmin && (
            <Link className={`${headerButtonClassName}`} to="/listings/new">
              Sell on here
            </Link>
          )}
          {isAdmin && (
            <Link
              className={`${headerButtonClassName}`}
              to={`/users/${props.currentUser.id}/home`}
              onClick={() => props.closeModal()}
            >
              Manage listings
            </Link>
          )}
          <Link
            className={`${headerButtonClassName}`}
            to={`/users/${props.currentUser.id}/reset`}
            onClick={() => props.closeModal()}
          >
            Reset password
          </Link>

          <a className={`${headerButtonClassName}`} onClick={handleSubmit}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(UserDropdown)
