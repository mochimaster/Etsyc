import React from 'react';
import ListingIndexContainer from './listing_index_container';
import ListingIndexItem from './listing_index_item';


class ListingIndex extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    // debugger
    this.props.getListings();
  }

  render() {

    // debugger
    

    return (
      <div>
        <ul>
          {this.props.listings.map(listing => {
            return ( <ListingIndexItem key={listing.id} listing={listing} deleteListing={this.props.deleteListing} /> )
          })}
        </ul>
      </div>
    )
  }


}

export default ListingIndex;
