import ListingFormContainer from './listing_form_container';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
// import ListingEditFormContainer from './listing_edit_form_container';


class ListingForm extends React.Component{

  constructor(props){
    super(props)
    // debugger;
    this.state = {
      title: (props.listing) ? props.listing.title : "",
      description: (props.listing) ? props.listing.description : "",
      overview: (props.listing) ? props.listing.overview : "",
      price: (props.listing) ? props.listing.price : "",
      photo: (props.listing) ? props.listing.photo : ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // removed  by Elliot
  // this.state.author_id = this.props.sessionId
  componentDidMount(){

    // debugger

    if(this.props.formType === 'Create Listing'){

    } else {

      this.props.getListing(this.props.match.params.listingId).then(() => {
          console.log('calling setstate')
          this.setState(
            {...this.props.listing},
            () => {}
          )

        })
    }
    // this.setState({listing:this.props.listing});
    // if(this.props.formType === 'Edit Listing'){
    //   console.log("inside if statement.")
    //   this.props.getListing(this.props.match.params.listingId)
    // } else {
    //   console.log("inside else.")
    //   return null
    // }
  }

  handleSubmit(e) {
    // debugger
    e.preventDefault();

    const formData = new FormData();
    formData.append('listing[title]', this.state.title);
    if(this.state.photoFile){
      formData.append('listing[photo]', this.state.photoFile);
    }

    $.ajax({
      url: '/api/listings',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    });


    this.props.action(this.state)
      .then((listing) => this.props.history.push(`/`));
      // .then((listing) => this.props.history.push(`/listings/${listing.id}`));
  }

  imagePreview(e){
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file});

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  updateTitle(e){
    this.setState({title: e.target.value})
  }

  updateOverview(e){
    this.setState({overview: e.target.value})
  }

  updateDescription(e){
    this.setState({description: e.target.value})
  }

  updateCategory(e){

  }

  updatePrice(e){
    this.setState({price: e.target.value})
  }

  // debugger
  // if(!this.state.listing){
  //   return null
  // }
  //



  render() {
    // from Elliot,

    if(!this.props.listing){
        return null
      }

    // Redirect user if logged in user is not the listing author.

    // explore try catch.
    if (this.props.formType === 'Edit Listing'){
      if(this.props.listing.author_id !== this.props.sessionId){
        this.props.history.push(`/`);
        return null
      }
    }

    // ----------------------------

    // const reader = new FileReader();
    // const file = e.currentTarget.files[0];
    // reader.onloadend = () =>
    //   this.setState({ imageUrl: reader.result, imageFile: file});
    //
    // if (file) {
    //   reader.readAsDataURL(file);
    // } else {
    //   this.setState({ imageUrl: "", imageFile: null });
    // }



    // ----------------------------



    //onSubmit={() => this.props.createListing(this.state)}
    // debugger
    return (
      <div className="create-listing-form-wrapper">
        <form className="create-form-wrapper" onSubmit={this.handleSubmit}>
          <div className="create-listing-photo create-listing-left-side">
            <p className="create-listing-photo-inner"> Add photo to server </p>


          </div>

          <div className="create-listing-right-side">
            <div className="create-listing-title">
              <label>Product Name:</label>
              <label className="required"> * </label>
              <br/>
              <input className="create-listing-title-input"
                onChange={this.updateTitle.bind(this)} value={this.state.title}
                type="text"/>
            </div>

            <div className="create-listing-overview">
              <label>Overview:</label>
              <label className="required"> * </label>

              <br/>
              <textarea onChange={this.updateOverview.bind(this)} className="create-listing-overview-textarea"></textarea>
            </div>

            <div className="create-listing-description">
              <label>Description:</label>
              <label className="required"> * </label>
              <br/>
              <textarea className="create-listing-description-input"
                onChange={this.updateDescription.bind(this)} value={this.state.description}
                />
            </div>

            <div className="create-listing-category">
              <label>Category:</label><label className="required"> * </label>

              <select className="create-listing-category-dropdown select-custom">
                <option value="jewelry-accessories">Jewelry & Accessories</option>
                <option value="home-living">Home & Living</option>
                <option value="art-collectibles">Art & Collectibles</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>

            <div className="create-listing-price">
              <label >Price: </label>
              <label className="required"> * </label>
              <label className="dollar-margin"> $</label>
              <input className="create-list-price-input" type="number" min="0.00" max="99999999.99"
                step="0.01" onChange={this.updatePrice.bind(this)} value={this.state.price}/>
            </div>

            <div className="create-listing-submit-button">
              <input className="submit-button btn-primary btn" type="submit"
                value={this.props.formType}  />
            </div>
          </div>

        </form>

      </div>

    )
  }
}


export default withRouter(ListingForm);
