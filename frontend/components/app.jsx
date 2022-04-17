import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { AuthRoute, ProtectedRoute } from '../util/route_util'
import Modal from './modal/modal'

import BookingContainer from './booking/booking'
import HeaderBannerContainer from './header_banner/header_banner'
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
import HomeFormContainer from './home_form/home_form_container'
import { Faq } from './faq/faq'
import NotFound from './not_found'

import ErrorShow from './error/error'
import Footer from './footer/footer'

window.mobileCheck = function () {
  let check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

window.isMobile = window.mobileCheck()

const App = () => {
  return (
    <div className="app-container">
      <Modal />
      <Route component={HeaderBannerContainer} />
      <Route component={HeaderContainer} />
      <div className="body">
        <Switch>
          <Route path={'/faq'} component={Faq} />
          <Route path={'/pages/appointment'} component={BookingContainer} />
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

        <div className="announcement">
          {/* <span className="announcement-red">Announcement</span>: Store is not
          available between 12/13/2021 - 12/24/2021 for pick ups. All purchases
          made between that will be put on hold for you and available for pick
          up 12/25 onwards. */}
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
            path="/users/:userId/reset"
            component={HomeFormContainer}
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
          <Route
            path="/listings/:listingId/:listingTitle?"
            component={ListingShowContainer}
          />
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
