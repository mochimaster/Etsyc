import { connect } from 'react-redux'

import Header from './header'

import { openModal } from '../../actions/modal_actions'
import { searchListing } from '../../actions/listing_actions'

const mapStateToProps = (state, ownProps) => {
  const currentSession = state.session.id ? state.session.id : 0

  return {
    currentUser: state.entities.users[currentSession]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    searchListing: (title, page, isDisabled) =>
      dispatch(searchListing(title, page, isDisabled))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
