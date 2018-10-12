import React from 'react';
import GreetingContainer from '../greeting/greeting_container';


// openModal ,currentUser

class Header extends React.Component {


  render() {
    let navBar = "";
    if (this.props.currentUser){
      console.log("Inside with current user.");
      // navBar = <UserDropdownContainer />
      navBar = <li className="container-profile-picture">
                  <a onClick={() => this.props.openModal('profileDropdown')}
                  className="icon-avatar">You</a>
                </li>
    }else{
      console.log("no current user.")
      navBar = <GreetingContainer />
    }
    return (

      <div id="global-header" className="header-nav-top-level">
        <header className="header-nav-inner">
          <div id="craftsy-logo" className="header-site-logo">
            <a href="/" aria-label="Craftsy" >Craftsy </a>
          </div>

          <div className="header-search-div-wrapper">
            <div className="header-search-bar-outer">
              <form id="nav-search" className="header-search-nav-form" method="" action="">
                <div className="header-search-bar-inner">
                  <div className="header-search-bar-input-wrapper" >
                    <input id="search-query" type="text"
                    defaultValue="Search for items or shops"/>
                  </div>
                  <div className="header-search-button-wrapper">
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <ul className="account-nav">
            <li className = "icon-sell-etsy"><a className="text-sell-etsy"
              href="">Sell on Etsy</a>
            </li>
            {navBar}
            <li>
              <a href="" className="icon-img-discover">
                <i class="fas fa-briefcase"></i><br/>Discover
              </a>
            </li>
            <li>
              <a href="" className="icon-img-cart">
                <i class="fas fa-shopping-cart"></i><br/>Cart
              </a>
            </li>
          </ul>

        </header>
      </div>
    )
  }

}

export default Header;
