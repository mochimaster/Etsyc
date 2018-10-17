import React from 'react';
import ListingShowContainer from './listing_show_container';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


class ListingShow extends React.Component {

  constructor(props){
    super(props);
    // debugger
    this.state = {
      quantity: 1
    }

  }

  updateQuantity(e){
    // debugger
    this.setState({quantity: parseInt(e.target.value)})

  }

  componentDidMount(){
    // debugger
    // this.props.getListings();
    this.props.getListing(this.props.match.params.listingId);
  }

  // componentWillReceiveProps(nextProps){
  //   debugger
  //   if (this.props.listing.id != nextProps.match.params.listingId) {
  //     debugger
  //     this.props.getListing(nextProps.match.params.listingId);
  //   }
  // }



  // The render() function should be pure, meaning that it does not modify
  // component state, it returns the same result each time it’s invoked, and
  // it does not directly interact with the browser.
  //
  // If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead. Keeping render() pure makes components easier to think about.
  //
  //


  render() {
    // this.props.listing.id = 1;
    // debugger;

    if (!this.props.listing) {
      return <div>Page Not Found.</div>;
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
        onClick={() => this.props.deleteListing(this.props.listing.id)
                          .then(()=>this.props.history.push("/listings"))

        } />


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
              ${this.props.listing.price}
            </div>
            {/*
            <div className="listing-details listing-details-shipping">
              Shipping fee
            </div>
            */}
            <div className="listing-details listing-details-quantity">
              Quantity <br/>
              <select onChange={this.updateQuantity.bind(this)} className="select-custom">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="listing-details add-to-cart">
              <button onClick={()=>this.props.createCart({quantity: this.state.quantity,
                listing_id: this.props.listing.id, user_id: this.props.sessionId })
                              .then(() => this.props.history.push(`/users/${this.props.sessionId}/carts`))}>
                Add to cart
              </button>
            </div>

            <div className="listing-details listing-details-overview">
              Overview
              <div>
                {this.props.listing.overview}
              </div>
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

export default (ListingShow);
