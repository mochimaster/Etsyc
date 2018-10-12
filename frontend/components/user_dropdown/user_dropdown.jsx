import React from 'react';


class UserDropdown extends React.Component{

  // currentUser: {id: 5, username: "kee4"}
  // logout: ƒ logout()
  // openModal: ƒ openModal(modal)

  render() {
    // debugger


    return(

      <div className= "header-modal-profile">
        <ul>
          <li>
            <div className="header-modal-profile-picture">
              Profile Picture
            </div>
            <div>
              {this.p}
            </div>
          </li>

          <li>
            <button className='header-button' onClick={this.props.logout}> Logout</button>
          </li>

        </ul>
      </div>

    )
  }



}

export default UserDropdown;
