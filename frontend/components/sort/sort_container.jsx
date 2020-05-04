import { connect } from 'react-redux'

import SortDropDownList from './sort'

import { setSort } from '../../actions/sort_actions'

const mapStateToProps = (state, ownProps) => {
  return {
    sortOption: state.entities.sortOption
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSort: (sortOption) => dispatch(setSort(sortOption))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortDropDownList)
