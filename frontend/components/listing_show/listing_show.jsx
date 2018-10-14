import React from 'react';
import ListingShowContainer from './listing_show_container';
import { Link } from 'react-router-dom';

class ListingShow extends React.Component {

  constructor(props){
    super(props);
    // debugger
  }

  componentDidMount(){
    // debugger
    // this.props.getListings();
    this.props.getListing(this.props.match.params.listingId);
  }



  render() {
    // debugger


    if (this.props.listing.author_id === this.props.sessionId) {
      console.log('im author');

      let editButton = ""

      editButton = <Link to="">Edit Listing</Link>

    } else {
      console.log('im not author.');
    }

    return (
      <div>
        Listing ID: {this.props.listing.id}
        Listing Title: {this.props.listing.title}
        Listing Description: {this.props.listing.description}
      </div>
    )
  }


}

export default ListingShow;
