import {connect} from 'react-redux';
import {openModal} from '../../actions/modal_actions';
import Header from './header'

const mapStateToProps = state => {
  // debugger
  let currentSession;
  if (state.session.id) {
    currentSession = state.session.id
  } else {
    currentSession = 0
  }

  return {
    currentUser: state.entities.users[currentSession],

  }
}
// currentUser: state.entities.users[state.session.id]
// export default App;

const mapDispatchToProps = dispatch => {
  return {
  openModal: (modal) => dispatch(openModal(modal))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);
