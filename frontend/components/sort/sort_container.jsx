import { connect } from 'react-redux'

import SortDropDownList from './sort'
import { selectListingsByAuthor } from '../../reducers/selectors'
import { getListings } from '../../actions/listing_actions'
import { getListingsByCategory } from '../../actions/category_actions'
import { setSort } from '../../actions/sort_actions'

const mapStateToProps = (state, ownProps) => {
  const listingsByAuthor = selectListingsByAuthor(
    state.entities,
    ownProps.match.params.userId
  )

  return {
    listings: listingsByAuthor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSort: sortOption => dispatch(setSort(sortOption)),
    getListings: (page = '') => dispatch(getListings(page)),
    getListingsByCategory: (categoryId, page) =>
      dispatch(getListingsByCategory(categoryId, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortDropDownList)
