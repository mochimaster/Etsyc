import { connect } from 'react-redux'
import { getListingsByCategory } from '../../actions/category_actions'
import CategoryIndex from './category_index'

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id,
    listings: state.entities.listings,
    page: state.entities.pagination.page,
    sortOption: state.entities.sortOption
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListingsByCategory: (categoryId, page, sortOption) =>
      dispatch(getListingsByCategory(categoryId, page, sortOption))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex)
