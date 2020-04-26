import { connect } from 'react-redux'

import Header from './header'

import { openModal } from '../../actions/modal_actions'
import { searchListing } from '../../actions/listing_actions'

const mapStateToProps = (state) => {
  const currentSession = state.session.id ? state.session.id : 0

  return {
    currentUser: state.entities.users[currentSession]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    searchListing: (title) => dispatch(searchListing(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
