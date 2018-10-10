import React from 'react';
import {Link} from 'react-router-dom';

const Greeting = props => {

  const sessionLinks = () => {
    return (
      <React.Fragment>
        <li>
          <Link to="/signup">Register</Link>
        </li>
        <li id="sign-in-link" className= "sign-in-link">
          <Link to="/login">Sign In</Link>
        </li>
      </React.Fragment>
    )
  }

  const personalGreeting = () => {
    return (
      <h1 className = "header-group">
        <div className = "header-name">
          Hi, {props.currentUser.username}
        </div>
        <button className='header-button' onClick={props.logout}> Logout</button>
      </h1>
    )
  }

  return props.currentUser ? personalGreeting() : sessionLinks()
}

export default Greeting;
