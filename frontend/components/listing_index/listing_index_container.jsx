import React from 'react';
import ListingIndex from './listing_index';
import { getListings, deleteListing, getListingsPage} from '../../actions/listing_actions';
import {connect} from 'react-redux';
import {selectListingsByAuthor} from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {

  let listingsByAuthor;
  // if (ownProps.match.params.userId){
    // listingsByAuthor = selectListingsByAuthor(state.entities, ownProps.match.params.userId);
    listingsByAuthor = selectListingsByAuthor(state.entities, ownProps.match.params.userId);
    
  // }

  return {
    // listings: Object.values(state.entities.listings),
    listings: listingsByAuthor,
    page: state.entities.pagination.page,
    pages: state.entities.pagination.pages
    // listingsByAuthor
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    getListings: (page="") => dispatch(getListings(page)),
    deleteListing: (id) => dispatch(deleteListing(id)),
    getListingsPage: (page) => dispatch(getListingsPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex);
