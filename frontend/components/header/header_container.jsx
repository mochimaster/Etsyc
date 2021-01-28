import { connect } from 'react-redux'

import Header from './header'

import { openModal } from '../../actions/modal_actions'
import { searchListing } from '../../actions/listing_actions'
import { getDisabledListingsByUserId } from '../../actions/home_actions'

const mapStateToProps = (state, ownProps) => {
  const currentSession = state.session.id ? state.session.id : 0

  return {
    currentUser: state.entities.users[currentSession],
    page: state.entities.pagination.page,
    pages: state.entities.pagination.pages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    searchListing: (title, page, isDisabled) =>
      dispatch(searchListing(title, page, isDisabled)),
    getDisabledListingsByUserId: (userId, page, sortOption, filters, search) =>
      dispatch(
        getDisabledListingsByUserId(userId, page, sortOption, filters, search)
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
