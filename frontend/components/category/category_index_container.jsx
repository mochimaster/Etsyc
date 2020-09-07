import { connect } from 'react-redux'

import CategoryIndex from './category_index'

import { getListingsByCategory } from '../../actions/category_actions'

const mapStateToProps = (state) => {
  return {
    page: state.entities.pagination.page,
    sortOption: state.entities.sortOption,
    filters: state.entities.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListingsByCategory: (categoryId, page, sortOption, filters) =>
      dispatch(getListingsByCategory(categoryId, page, sortOption, filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex)
