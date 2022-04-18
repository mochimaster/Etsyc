import { connect } from 'react-redux'

import { asArray } from '../../reducers/selectors'

import { getCarts } from '../../actions/cart_actions'

import BookingShow from './booking_show'

const mapStateToProps = (state) => ({
  currentUserId: state.session.id,
  carts: asArray(state.entities.carts) || []
})

const mapDispatchToProps = (dispatch) => ({
  getCarts: (user_id) => dispatch(getCarts(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingShow)
