import { connect } from 'react-redux'

import HomeIndex from './home_index'

import { getDisabledListingsByUserId } from '../../actions/home_actions'

const mapStateToProps = (state) => {
  return {
    userId: state.session.id,
    disabledListings: state.entities.disabledListings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDisabledListingsByUserId: (userId) =>
      dispatch(getDisabledListingsByUserId(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)
