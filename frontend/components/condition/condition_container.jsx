import { connect } from 'react-redux'

import ConditionDropDownList from './condition'

import { setCondition } from '../../actions/filter_actions'

const mapStateToProps = (state, ownProps) => {
  return {
    condition: state.entities.condition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCondition: (condition) => dispatch(setCondition(condition))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionDropDownList)
