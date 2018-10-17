import {connect} from 'react-redux';
import Footer from './footer';

const mapStateToProps = state => {
  return {
    state: null
  }
}

const mapDispatchToProps = props => {
  return {
    null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
