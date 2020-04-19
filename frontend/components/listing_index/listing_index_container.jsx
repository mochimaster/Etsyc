import ListingIndex from './listing_index'
import {
  getListings,
  deleteListing,
  getListingsPage
} from '../../actions/listing_actions'
import { getListingsByCategory } from '../../actions/category_actions'
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
    sortOption: state.entities.sortOption,
    disabledListings: state.entities.disabledListings
    // listingsByAuthor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListings: (page = '', sortOption) =>
      dispatch(getListings(page, sortOption)),
    getListingsByCategory: (category, page, sortOption) =>
      dispatch(getListingsByCategory(category, page, sortOption))
    // deleteListing: id => dispatch(deleteListing(id)),
    // getListingsPage: page => dispatch(getListingsPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex)
