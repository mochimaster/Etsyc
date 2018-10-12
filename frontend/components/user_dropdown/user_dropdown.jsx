import React from 'react';


class UserDropdown extends React.Component{

  // currentUser: {id: 5, username: "kee4"}
  // logout: ƒ logout()
  // openModal: ƒ openModal(modal)

  render() {
    // debugger

    let username = ""
    if (this.props.currentUser){
      username = this.props.currentUser.username;
    }


    return(

      <div className= "header-modal-profile">
        <ul className = "modal-profile-dropdown-container">
          <li className= "profile-dropdown-section1">
            <div className="header-modal-profile-picture">
              <a className="icon-profile-picture"> </a>
            </div>
            <div className="header-modal-username">
              {username}
            </div>
          </li>

          <li className="profile-dropdown-section2">
            <a  className='header-button' onClick={this.props.logout}> Sign out</a>
          </li>

        </ul>
      </div>

    )
  }



}

// <button className='header-button' onClick={this.props.logout}> Logout</button>
export default UserDropdown;
