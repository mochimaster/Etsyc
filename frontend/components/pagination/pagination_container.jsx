import { getListings, searchListing } from '../../actions/listing_actions'
import { getListingsByCategory } from '../../actions/category_actions'
import { connect } from 'react-redux'
import { selectListingsByAuthor } from '../../reducers/selectors'
import PaginationAll from './pagination'
import search from '../search/search'

const mapStateToProps = (state, ownProps) => {
  let listingsByAuthor = selectListingsByAuthor(
    state.entities,
    ownProps.match.params.userId
  )
  return {
    listings: listingsByAuthor,
    page: state.entities.pagination.page,
    pages: state.entities.pagination.pages,
    sortOption: state.entities.sortOption,
    filters: state.entities.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListings: (page = '', sortOption, filters) =>
      dispatch(getListings(page, sortOption, filters)),
    getListingsByCategory: (categoryId, page, filters) =>
      dispatch(getListingsByCategory(categoryId, page, filters)),
    searchListing: (title, page) => dispatch(searchListing(title, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationAll)
