import React from 'react';
import ListingIndexContainer from './listing_index_container';
import ListingIndexItem from './listing_index_item';


class ListingIndex extends React.Component {

  // need to arrive here from Index all.
    // can filter down from all listings to where authorid


  // need to arrive here from User Profile page.
    // in user Profile, i have own props match params id.




  constructor(props){
    super(props);
  }

  componentDidMount(){
    // debugger
    this.props.getListings();
  }

  componentWillReceiveProps(newProps){
    // if newProps params have userID , need to filter.
    //
    // if(this.props.)
    

  }

  render() {

    // debugger


    return (
      <div >
        <ul className='index-wrapper'>
          {this.props.listings.map(listing => {
            return ( <ListingIndexItem key={listing.id} listing={listing} deleteListing={this.props.deleteListing} /> )
          })}
        </ul>
      </div>
    )
  }


}

export default ListingIndex;
