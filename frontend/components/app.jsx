import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SessionForm from './session_form/session_form'
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import {AuthRoute} from '../util/route_util'
import Modal from './modal/modal';
import UserDropdownContainer from './user_dropdown/user_dropdown_container';
import {connect} from 'react-redux';
import { openModal } from '../actions/modal_actions';
import Header from './header/header_container';




const App = () => {

  // debugger


  return (
    <div>
      <Modal />
      <Header />


      <Switch>
        {/* Good comment. The below line will be modified
          when I have a component to render on "/" */}
        <Route exact path="/" render={() => null} />

        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;

// <AuthRoute exact path="/login" component={LogInFormContainer} />
// <AuthRoute exact path="/signup" component={SignUpFormContainer} />
// const mapStateToProps = state => {
//   // debugger
//   let currentSession;
//   if (state.session.id) {
//     currentSession = state.session.id
//   } else {
//     currentSession = 0
//   }
//
//   return {
//     currentUser: state.entities.users[currentSession]
//   }
// }
// // currentUser: state.entities.users[state.session.id]
//
// const mapDispatchToProps = dispatch => {
//   return {
//   openModal: (modal) => dispatch(openModal(modal))
//   }
// }



// export default connect(mapStateToProps, mapDispatchToProps)(App);

// <div id="global-header" className="header-nav-top-level">
//   <header className="header-nav-inner">
//     <div id="craftsy-logo" className="header-site-logo">
//       <a href="/" aria-label="Craftsy" >Craftsy </a>
//     </div>
//     <div className="header-search-div-wrapper">
//       <div className="header-search-bar-outer">
//         <form id="nav-search" className="header-search-nav-form" method="" action="">
//           <div className="header-search-bar-inner">
//             <div className="header-search-bar-input-wrapper" >
//               <input id="search-query" type="text"
//               defaultValue="Search for items or shops"/>
//             </div>
//             <div className="header-search-button-wrapper">
//               <button className="btn btn-primary">Search</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//
//
//
//       <ul className="account-nav">
//         <li className = "icon-sell-etsy"><a className="text-sell-etsy" href="">Sell on Etsy</a></li>
//         {navBar}
//         <li>
//           <a href="" className="icon-img-discover">
//             <i class="fas fa-briefcase"></i><br/>Discover
//           </a>
//         </li>
//         <li>
//           <a href="" className="icon-img-cart">
//             <i class="fas fa-shopping-cart"></i><br/>Cart
//           </a>
//         </li>
//       </ul>
//
//   </header>
//
// </div>
