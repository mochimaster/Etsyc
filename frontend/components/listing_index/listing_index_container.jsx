import React from 'react';
import ListingIndex from './listing_index';
import {getListings, deleteListing} from '../../actions/listing_actions';
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
    listings: listingsByAuthor
    // listingsByAuthor
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    getListings: () => dispatch(getListings()),
    deleteListing: (id) => dispatch(deleteListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex);
