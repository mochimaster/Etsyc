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
    getDisabledListingsByUserId: (userId, page, sortOption, filters) =>
      dispatch(getDisabledListingsByUserId(userId, page, sortOption, filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)
