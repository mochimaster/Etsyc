import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { AuthRoute, ProtectedRoute } from '../util/route_util'
import Modal from './modal/modal'

import HeaderContainer from './header/header_container'
import ListingIndexContainer from './listing_index/listing_index_container'
import ListingShowContainer from './listing_show/listing_show_container'
import ListingFormContainer from './listing_form/listing_form_container'
import ListingEditFormContainer from './listing_form/listing_edit_form_container'
import CartContainer from './cart/cart_container'
import CategoryIndexContainer from './category/category_index_container'
import CategoryShowContainer from './category/category_show_container'
import PaginationAll from '../components/pagination/pagination_container'
import SortDropDownContainer from './sort/sort_container'
import HomeIndexContainer from './home_index/home_index_container'
import ConditionDropDownContainer from './condition/condition_container'

import ErrorShow from './error/error'
import Footer from './footer/footer'

const App = () => {
  return (
    <div className="app-container">
      <Modal />
      <Route component={HeaderContainer} />
      <div className="body">
        <CategoryIndexContainer />
        <div className="filters">
          <Route
            exact
            path={['/listings', '/categories/:categoryId']}
            component={ConditionDropDownContainer}
          />
          <Route
            exact
            path={['/listings', '/categories/:categoryId']}
            component={SortDropDownContainer}
          />
        </div>
        <Switch>
          {/* Good comment. The below line will be modified
            when I have a component to render on "/" */}

          <ProtectedRoute
            exact
            path="/listings/new"
            component={ListingFormContainer}
          />
          <Route
            path="/categories/:categoryId"
            component={CategoryShowContainer}
          />
          <ProtectedRoute
            path="/users/:userId/home"
            component={HomeIndexContainer}
          />
          <ProtectedRoute
            path="/users/:userId/carts"
            component={CartContainer}
          />
          <Route exact path="/listings" component={ListingIndexContainer} />
          <Route path="/search" component={ListingIndexContainer} />
          <ProtectedRoute
            path="/listings/:listingId/edit"
            component={ListingEditFormContainer}
          />
          <Route path="/listings/:listingId" component={ListingShowContainer} />
          <Route exact path="/error" component={ErrorShow} />
          <Redirect to="/listings" />
          <Redirect to="/" />
        </Switch>
        <Switch>
          <Route
            path={['/search', '/categories', '/users/:userId/home']}
            component={PaginationAll}
          />
          <Route exact path={['/listings']} component={PaginationAll} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

// <Route path="/users/:userId/carts" component={CartContainer} />

// <Route exact path="/" render={() => null} />
// <Route path="/listings/:listingId" component={ListingShowContainer} />
export default App

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
