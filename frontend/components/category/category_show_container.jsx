import { connect } from 'react-redux'

import CategoryShow from './category_show'

import { getListingsByCategory } from '../../actions/category_actions'
import { selectListingsByAuthor } from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => {
  const listingsByAuthor = selectListingsByAuthor(
    state.entities,
    ownProps.match.params.userId
  )

  return {
    category: ownProps.match.params.categoryId,
    listings: listingsByAuthor,
    sortOption: state.entities.sortOption,
    page: state.entities.pagination.page,
    filters: state.entities.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListingsByCategory: (listingId, page, sortOption, filters) =>
      dispatch(getListingsByCategory(listingId, page, sortOption, filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShow)
