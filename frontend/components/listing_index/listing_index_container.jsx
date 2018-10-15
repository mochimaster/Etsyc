import React from 'react';
import ListingIndex from './listing_index';
import {getListings, deleteListing} from '../../actions/listing_actions';
import {connect} from 'react-redux';
import {selectListingsByAuthor} from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  debugger
  let listingsByAuthor;
  if (ownProps.match.params.userId){
    listingsByAuthor = selectListingsByAuthor(state.entities, ownProps.match.params.userId);
    debugger;
  }

  return {
    listings: Object.values(state.entities.listings),
    listingsByAuthor
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    getListings: () => dispatch(getListings()),
    deleteListing: (id) => dispatch(deleteListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex);
