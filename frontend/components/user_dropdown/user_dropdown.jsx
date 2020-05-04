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

  return (
    <div className="header-modal-profile">
      <ul className="modal-profile-dropdown-container">
        <li className="profile-dropdown-section1">
          <div className="header-modal-profile-picture">
            <a className="icon-profile-picture"> </a>
          </div>
          <div className="header-modal-username">{username}</div>
        </li>

        <li className="profile-dropdown-section2">
          <Link
            className="header-button"
            to={`/users/${props.currentUser.id}/home`}
          >
            Manage listings
          </Link>
          <a className="header-button" onClick={handleSubmit}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(UserDropdown)
