import React from 'react';
import ListingShowContainer from './listing_show_container';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


class ListingShow extends React.Component {

  componentDidMount(){
    // debugger
    // this.props.getListings();
    this.props.getListing(this.props.match.params.listingId);
  }

  componentWillReceiveProps(nextProps){
    // debugger
    if (this.props.listing.id != nextProps.match.params.listingId) {
      debugger
      this.props.getListing(nextProps.match.params.listingId);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.post.id != nextProps.match.params.postId) {
  //     this.props.fetchPost(nextProps.match.params.postId);
  //   }
  // }

  // constructor(props){
  //   super(props);
  //   debugger
  // }

  //   componentWillReceiveProps(nextProps) {
  //   if (this.props.post.id != nextProps.match.params.postId) {
  //     this.props.fetchPost(nextProps.match.params.postId);
  //   }
  // }




  render() {
    // debugger
    // this.props.listing.id = 1;
    // debugger;

    if (!this.props.listing) {
      return <div>Loading...</div>;
    }


    let editButton;
    let deleteButton;
    if (this.props.listing.author_id === this.props.sessionId) {
      console.log('im author');

      // debugger;

      editButton = <Link className="btn btn-primary listing-show-edit-button"
        to={`/listings/${this.props.listing.id}/edit`} >Edit Listing</Link>

      deleteButton = <input className="btn btn-primary listing-show-delete-button"
        type="submit" value="Delete Listing"
        onClick={`this.props.deleteListing(${this.props.listing.id})`} />

    } else {
      console.log('im not author.');
    }

    let quantityDropdown;
    // for(let i=0; i<100; i++){
    //   quantityDropdown += "<option value="+ i + ">+i+</option>"
    // }

    // let quantityDropdown2 = new Element(() => {
    //   return (
    //
    //
    //
    //   )
    // })

    // debugger;

    return (
      <div className="listing-show-content-wrapper">
        <div className="listing-show-author-buttons">
          {editButton}
          {deleteButton}
        </div>
        <div className="listing-show-seller-header">
          <div className="listing-header-seller-left">
            <div className="listing-header-seller-name">
              Merchant Name: {this.props.listing.author_id}
            </div>
            <div className="listing-header-seller-rating">
              Rating in stars (xx)
            </div>
          </div>
          <div className="listing-header-seller-thumbnails">
            Other items in thumbnails...
          </div>
        </div>

        <div className="listing-show-body-wrapper">
          <div className="listing-image listing-left-half">
            <img alt="test_image" src="https://i.etsystatic.com/17442787/r/il/6f8689/1640702720/il_570xN.1640702720_56of.jpg" />
          </div>

          <div className="listing-details listing-right-half">
            <div className="listing-details listing-details-title">
              {this.props.listing.title}
            </div>
            <div className="listing-details listing-details-price">
              $99.99
            </div>
            {/*
            <div className="listing-details listing-details-shipping">
              Shipping fee
            </div>
            */}
            <div className="listing-details listing-details-quantity">
              Quantity <br/>
              <select className="select-custom">
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            <div className="listing-details add-to-cart">
              <button>
                Add to cart
              </button>
            </div>
          </div>



          <div className="listing-description">
            Description <br/>
            <p>{this.props.listing.description}</p>
          </div>
          <div>
          Seller other items index list by seller
          </div>
          <div className="listing-reviews">
            Reviews component that returns li
          </div>



        </div>
      </div>
    )
  }


}

export default withRouter(ListingShow);
