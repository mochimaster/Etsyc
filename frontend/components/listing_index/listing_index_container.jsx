import ListingIndex from './listing_index'
import { getListings, searchListing } from '../../actions/listing_actions'
import { getListingsByCategory } from '../../actions/category_actions'
import { getDisabledListingsByUserId } from '../../actions/home_actions'
import { connect } from 'react-redux'
import { selectListingsByAuthor } from '../../reducers/selectors'

const mapStateToProps = (state, ownProps) => {
  let listingsByAuthor
  // if (ownProps.match.params.userId){
  // listingsByAuthor = selectListingsByAuthor(state.entities, ownProps.match.params.userId);
  listingsByAuthor = selectListingsByAuthor(
    state.entities,
    ownProps.match.params.userId
  )
  // }

  return {
    // listings: Object.values(state.entities.listings),
    listings: listingsByAuthor,
    page: state.entities.pagination.page,
    pages: state.entities.pagination.pages,
    count: state.entities.pagination.count,
    sortOption: state.entities.sortOption,
    disabledListings: state.entities.disabledListings,
    filters: state.entities.filters
    // listingsByAuthor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListings: (page = '', sortOption, filters) =>
      dispatch(getListings(page, sortOption, filters)),
    getListingsByCategory: (category, page, sortOption, filters) =>
      dispatch(getListingsByCategory(category, page, sortOption, filters)),
    searchListing: (title, page) => dispatch(searchListing(title, page)),
    getDisabledListingsByUserId: (userId, page, sortOption, filters, search) =>
      dispatch(
        getDisabledListingsByUserId(userId, page, sortOption, filters, search)
      )

    // deleteListing: id => dispatch(deleteListing(id)),
    // getListingsPage: page => dispatch(getListingsPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex)
