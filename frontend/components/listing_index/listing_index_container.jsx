import React from 'react';
import ListingIndex from './listing_index';
import {getListings, deleteListing} from '../../actions/listing_actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  // debugger
  return {
    listings: Object.values(state.entities.listings)
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    getListings: () => dispatch(getListings()),
    deleteListing: (id) => dispatch(deleteListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex);
