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
import { Faq } from './faq/faq'
import NotFound from './not_found'

import ErrorShow from './error/error'
import Footer from './footer/footer'

const App = () => {
  return (
    <div className="app-container">
      <Modal />
      <Route component={HeaderContainer} />
      <div className="body">
        <Switch>
          <Route path={'/faq'} component={Faq} />
          <Route path={['/']} component={CategoryIndexContainer} />
        </Switch>

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
          <Route path="/listings/search" component={ListingIndexContainer} />
          <ProtectedRoute
            path="/listings/:listingId/edit"
            component={ListingEditFormContainer}
          />
          <Route path="/listings/:listingId" component={ListingShowContainer} />
          <Route exact path="/error" component={ErrorShow} />
          <Redirect exact from="/" to="/listings" />
          <Route component={NotFound} />
        </Switch>
        <Switch>
          <Route
            path={['/listings/search', '/categories', '/users/:userId/home']}
            component={PaginationAll}
          />
          <Route exact path={['/listings']} component={PaginationAll} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
