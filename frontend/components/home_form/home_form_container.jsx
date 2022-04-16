import { connect } from 'react-redux'

import { resetPassword } from '../../actions/home_actions'

import HomeForm from './home_form'

const mapStateToProps = (state) => ({
  session: state.session.id,
  username: Object.values(state.entities.users)[0].username,
  resetPasswordResponse: state.entities.resetPassword
})

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (credential) =>
    dispatch(resetPassword({ ...credential, userId: credential.session }))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeForm)
