import React from 'react';
import {Link} from 'react-router-dom';
import UserDropdownContainer from '../user_dropdown/user_dropdown_container';

const Greeting = ({ currentUser, logout, openModal}) => {

  // <Link to="/signup">Register</Link>
  // <Link to="/login">Sign In</Link>
  const sessionLinks = () => {
    return <React.Fragment>
        <li>
          <button className="header-nav-register" onClick={() => openModal("signup")}>
            Register
          </button>
        </li>
        <li id="sign-in-link" className="sign-in-link">
          <button className="header-nav-signin" onClick={() => openModal("login")}>
            Sign In
          </button>
        </li>
        <li id="demo-sign-in-link" className="sign-in-link">
          <button className="header-nav-signin demo-sign-in-link" onClick={() => openModal("demo")}>
            Demo User
          </button>
        </li>
      </React.Fragment>;
  }

  // const personalGreeting = () => {
  //   return (
  //     <React.Fragment>
  //       <li>
  //           Hi, {currentUser.username}
  //           <UserDropdownContainer />
  //       </li>
  //       <li>
  //         <button className='header-button' onClick={logout}> Logout</button>
  //       </li>
  //     </React.Fragment>
  //   )
  // }

  // return currentUser ? personalGreeting() : sessionLinks()
  return currentUser ? null : sessionLinks()
}

export default Greeting;
