import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SessionForm from './session_form/session_form'
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';


const App = () => {
  return (
    <div>
      <div id="global-header" className="header-nav-top-level">
        <header className="header-nav-inner">
          <div id="craftsy-logo" className="header-site-logo">
            Craftsy
            <a href="/" aria-label="Craftsy" />
          </div>
          <div className="header-search-div-wrapper">
            <div className="header-search-bar-outer">
              <form id="nav-search" className="header-search-nav-form" method="" action="">
                <div className="header-search-bar-inner">
                  <div className="header-search-bar-input-wrapper" >
                    <input id="search-query" type="text" value="Search for items or shops"/>
                  </div>
                  <div className="header-search-button-wrapper">
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>


            <ul className="account-nav">
              <li><a href="">Sell on Etsy</a></li>
              <GreetingContainer />
              <li><a href="">Discover</a></li>
              <li><a href="">Cart</a></li>
            </ul>



        </header>
      </div>



      <Route path="/login" component={LogInFormContainer} />
      <Route path="/signup" component={SignUpFormContainer} />

    </div>
  )
}

export default App;
