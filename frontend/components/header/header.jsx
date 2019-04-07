import React from 'react';
import GreetingContainer from '../greeting/greeting_container';
import { Link } from 'react-router-dom';
import Search from '../search/search';

// openModal ,currentUser

class Header extends React.Component {


  render() {
    let navBar = "";
    let cartLink;
    if (this.props.currentUser){
      // navBar = <UserDropdownContainer />
      navBar = <li className="container-profile-picture">
                  <a onClick={() => this.props.openModal('profileDropdown')}
                  className="icon-avatar">You</a>
                </li>

      cartLink = <Link to={`/users/${this.props.currentUser.id}/carts`} className="icon-img-cart">
                  <i className="fas fa-shopping-cart"></i><br/>Cart
                 </Link>
    }else{
      navBar = <GreetingContainer />
      cartLink = <Link to="/error" className="icon-img-cart">
                  <i className="fas fa-shopping-cart"></i><br/>Cart
                 </Link>
    }


    return (

      <div id="global-header" className="header-nav-top-level">
        <header className="header-nav-inner">
          <div id="craftsy-logo" className="header-site-logo">
            <Link to="/" aria-label="Craftsy" >C & C</Link>
          </div>

          <div className="header-search-div-wrapper">
            <div className="header-search-bar-outer">
              <Search search={this.props.searchListing}/>
            </div>
          </div>

          <ul className="account-nav">
            <li className = "icon-sell-etsy"><Link to={`/listings/new`} className="text-sell-etsy"
              href="">Sell on Castle & Chair</Link>
            </li>
            {navBar}
            <li>
              <Link to="/" className="icon-img-discover">
                <i className="fas fa-briefcase"></i><br/>Discover
              </Link>
            </li>
            <li>
              {cartLink}

            </li>
          </ul>

        </header>
      </div>
    )
  }

}

  // {cartLink}


export default Header;
